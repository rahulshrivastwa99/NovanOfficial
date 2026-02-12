const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Using 'protect' ensures only logged-in users can hit these routes
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;