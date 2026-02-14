const express = require('express');
const router = express.Router();
const { 
  addOrderItems, 
  getMyOrders, 
  getOrders, 
  updateOrderToDelivered,
  submitReturnRequest,
  submitAbandonmentSurvey,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Using 'protect' ensures only logged-in users can hit these routes
router.route('/')
.post(protect, addOrderItems)
.get(protect, admin, getOrders);

router.route('/abandonment').post(submitAbandonmentSurvey); // Public route (user might drop before auth, or we handle auth inside)

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/return').post(protect, submitReturnRequest);

module.exports = router;