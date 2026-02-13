const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  // Search by name
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
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
  if (req.query.minPrice) {
    priceFilter.$gte = Number(req.query.minPrice);
  }
  if (req.query.maxPrice) {
    priceFilter.$lte = Number(req.query.maxPrice);
  }
  const price =
    Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {};

  // Combined Query
  const count = await Product.countDocuments({ ...keyword, ...category, ...price });

  // Add sorting (optional, newest first by default)
  const products = await Product.find({ ...keyword, ...category, ...price })
    .sort({ createdAt: -1 }) 
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
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

module.exports = { 
  getProducts, 
  getProductById, 
  createProduct,
  createProductReview 
};