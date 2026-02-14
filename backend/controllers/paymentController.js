const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create
// @access  Private
const createPaymentOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Math.round(amount * 100), // Razorpay works in paise (100 paise = 1 Rupee)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Verify Payment Signature
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      // Find the order and update it
      const Order = require('../models/Order');
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.status = 'Paid'; // Update status to Paid
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'completed',
          update_time: Date.now(),
          email_address: req.user ? req.user.email : '',
        };

        // If it was COD, switch to Online since they paid now
        if (order.paymentMethod === 'COD') {
            order.paymentMethod = 'Razorpay (Prepaid)';
        }

        await order.save();
        res.json({ success: true, message: 'Payment verified and Order Updated' });
      } else {
        res.status(404).json({ success: false, message: 'Order not found' });
      }
    } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: 'Server Error during Order Update' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
};

module.exports = { createPaymentOrder, verifyPayment };