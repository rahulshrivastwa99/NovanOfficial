const express = require('express');
const router = express.Router();
const { createPaymentOrder, verifyPayment, debugEnv } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/create').post(protect, createPaymentOrder);
router.route('/verify').post(protect, verifyPayment);
router.route('/debug-env').get(debugEnv);

module.exports = router;