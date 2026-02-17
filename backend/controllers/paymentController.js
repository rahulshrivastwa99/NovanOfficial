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

  console.log("--- DEBUG: createPaymentOrder ---");
  console.log("Request Amount:", amount);
  console.log("Key ID Present:", !!process.env.RAZORPAY_KEY_ID);
  console.log("Key Secret Present:", !!process.env.RAZORPAY_KEY_SECRET);

  if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
      return res.status(400).json({ message: "Invalid amount format" });
  }

  const options = {
    amount: Math.round(parsedAmount * 100), // Razorpay works in paise (100 paise = 1 Rupee)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", order.id);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Create Error:", error);
    // Send detailed error to frontend
    res.status(500).json({ 
        message: "Razorpay Order Creation Failed", 
        error: error.error ? error.error.description : error.message 
    });
  }
};

// @desc    Verify Payment Signature
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  console.log("--- DEBUG: verifyPayment ---");
  console.log("OrderID (DB):", orderId);
  console.log("Razorpay Order ID:", razorpay_order_id);
  console.log("Razorpay Payment ID:", razorpay_payment_id);
  
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;
  console.log("Signature Match:", isAuthentic);

  if (isAuthentic) {
    try {
      // Find the order and update it
      const Order = require('../models/Order');
      const order = await Order.findById(orderId);

      if (order) {
        // Idempotency Check: If already paid, return success immediately
        if (order.isPaid) {
             console.log("Order already marked as paid. Skipping update.");
             return res.json({ success: true, message: 'Payment already verified' });
        }

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
            console.log("Switching COD order to Online");
            order.paymentMethod = 'Razorpay (Prepaid)';
        }

        await order.save();
        res.json({ success: true, message: 'Payment verified and Order Updated' });
      } else {
        console.error("Order not found in DB:", orderId);
        res.status(404).json({ success: false, message: 'Order not found' });
      }
    } catch (error) {
       console.error("Error updating order:", error);
       res.status(500).json({ success: false, message: 'Server Error during Order Update' });
    }
  } else {
    console.error("Signature Mismatch. Expected:", expectedSignature, "Received:", razorpay_signature);
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
};

const debugEnv = (req, res) => {
    res.json({
        keyIdPresent: !!process.env.RAZORPAY_KEY_ID,
        keySecretPresent: !!process.env.RAZORPAY_KEY_SECRET,
        keyIdPrefix: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.substring(0, 5) : 'N/A'
    });
};

module.exports = { createPaymentOrder, verifyPayment, debugEnv };