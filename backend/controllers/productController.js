const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
  
    let keywordStr = req.query.keyword || '';
    let minPrice = Number(req.query.minPrice) || 0;
    let maxPrice = Number(req.query.maxPrice) || 0;
  
    // --- SMART SEARCH PARSING ---
    // Regex patterns for price
    const underRegex = /(?:under|below|less than)\s+(\d+)/i;
    const aboveRegex = /(?:above|over|more than)\s+(\d+)/i;
  
    // Check for "under 1000"
    const underMatch = keywordStr.match(underRegex);
    if (underMatch) {
      maxPrice = Number(underMatch[1]);
      // Remove the price phrase from keyword so we only search the product name
      keywordStr = keywordStr.replace(underRegex, '').trim();
    }
  
    // Check for "above 500"
    const aboveMatch = keywordStr.match(aboveRegex);
    if (aboveMatch) {
      minPrice = Number(aboveMatch[1]);
      keywordStr = keywordStr.replace(aboveRegex, '').trim();
    }
    // ---------------------------
  
    // Search by name
    const strictKeyword = keywordStr
      ? {
          name: {
            $regex: keywordStr,
            $options: 'i',
          },
        }
      : {};
  
    // Filter by Category
    const category =
      req.query.category && req.query.category !== 'all'
        ? { category: req.query.category }
        : {};
  
    // Filter by Price Range
    const priceFilter = {};
    if (minPrice > 0) {
      priceFilter.$gte = minPrice;
    }
    if (maxPrice > 0) {
      priceFilter.$lte = maxPrice;
    }
    const price =
      Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {};
  
    // Filter by Size
    // Since sizes is an array of objects { size: String, stock: Number }, 
    // we must query nested field "sizes.size"
    const size = req.query.size;
    const sizeFilter = size ? { "sizes.size": size } : {};
  
    let query = { ...strictKeyword, ...category, ...price, ...sizeFilter };

    console.log("--- DEBUG getProducts ---");
    console.log("QP:", req.query);
    console.log("Mongo Query:", JSON.stringify(query));
    
    let count = await Product.countDocuments(query);
    let products = [];
    let isFallback = false;
  
    // 2. Relaxed Search (if strict search returns 0)
    if (count === 0 && keywordStr) {
      const words = keywordStr.split(/\s+/).filter(w => w.length > 2); // Split into words, ignore short ones
      if (words.length > 0) {
        const relaxedQuery = {
          ...category,
          ...price,
          ...sizeFilter, 
          $or: words.map(w => ({ name: { $regex: w, $options: 'i' } }))
        };
        
        count = await Product.countDocuments(relaxedQuery);
        if (count > 0) {
          query = relaxedQuery;
          isFallback = true;
        }
      }
    }
  
    // 3. Ultimate Fallback (if still 0, just show all/popular/latest)
    // Only do this if we are on page 1, to prevent weird pagination issues
    if (count === 0 && page === 1) {
         // Clear keyword filter to show *something*, but KEEP other hard filters like category/price if user set them?
         // Usually a fallback "You might like these" ignores strict filters.
         // Let's keep it simple: clear keyword but maybe keep category if it exists?
         // For now, let's clear everything to ensure results.
         query = {}; 
         count = await Product.countDocuments(query);
         isFallback = true;
    }
  
    products = await Product.find(query)
      .sort({ createdAt: -1 }) 
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ 
        products, 
        page, 
        pages: Math.ceil(count / pageSize), 
        count,
        isFallback,
        message: isFallback ? (products.length > 0 ? "No exact matches found. Showing relevant results." : "No results found.") : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product (With Cloudinary Image Support)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, price, description, category, sizes, colors, stock } = req.body;
  
  // Cloudinary URL can be exposed as `path`, `secure_url`, or `url` depending on version.
  // Prefer `path`, but fall back gracefully so the frontend always receives a usable URL.
  const images = req.files
    ? req.files.map((file) => file.path || file.secure_url || file.url).filter(Boolean)
    : [];

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      // Parsing JSON strings back to objects/arrays if sent via FormData
      sizes: sizes ? JSON.parse(sizes) : [],
      colors: colors ? JSON.parse(colors) : [],
      images, 
      stock: stock ? JSON.parse(stock) : {},
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Ensure reviews array exists (for legacy products)
      if (!product.reviews) {
        product.reviews = [];
      }

      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, category, sizes, colors, stock } = req.body;

  // Handle Image Uploads (similar to create)
  // If new images are uploaded, they are appended or replaced depending on logic.
  // For simplicity here, we'll just add new ones if provided.
  const newImages = req.files
    ? req.files.map((file) => file.path || file.secure_url || file.url).filter(Boolean)
    : [];

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      
      if (sizes) product.sizes = JSON.parse(sizes);
      if (colors) product.colors = JSON.parse(colors);
      // product.stock is not used anymore in favor of sizes
      
      if (newImages.length > 0) {
          // Check if we should replace or append. Let's append for now or use logic passed from front
          product.images = [...product.images, ...newImages];
      }
      // If client sends 'images' as JSON string (existing images to keep), handle that logic here if needed
      // But usually FormData sends files separately.

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  getProducts, 
  getProductById, 
  createProduct,
  createProductReview,
  deleteProduct,
  updateProduct
};