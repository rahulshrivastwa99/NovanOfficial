const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Routes
router
  .route('/')
  .get(getProducts)
  // Ensure 'images' matches the key used in your Frontend FormData
  .post(protect, admin, upload.array('images', 5), createProduct); 

router.route('/:id').get(getProductById);

module.exports = router;