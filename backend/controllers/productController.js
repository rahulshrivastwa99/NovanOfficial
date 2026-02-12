const Product = require('../models/Product');

// @desc    Fetch all products
const getProducts = async (req, res) => {
  const keyword = req.query.keyword ? {
    name: { $regex: req.query.keyword, $options: 'i' }
  } : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
};

// @desc    Fetch single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product (With Cloudinary Image Support)
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

module.exports = { getProducts, getProductById, createProduct };