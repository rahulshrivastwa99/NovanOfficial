const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product'); // <--- IMPORT PRODUCT MODEL

// @desc    Get all orders (Admin)
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

// @desc    Create new order
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    try {
      // 1. Create the Order
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      // 2. UPDATE STOCK (Decrement Quantity)
      for (const item of orderItems) {
        const product = await Product.findById(item.product);

        if (product) {
          // Check if sizes exist
          if (!product.sizes || product.sizes.length === 0) {
             console.warn(`Product ${product.name} (ID: ${product._id}) has no sizes defined.`);
             continue; // Skip stock update if no sizes
          }

          // Find the specific size variant
          const sizeVariant = product.sizes.find(s => s.size === item.size);
          
          if (sizeVariant) {
              if (sizeVariant.stock >= item.qty) {
                  sizeVariant.stock -= item.qty;
              } else {
                  console.log(`Insufficient stock for ${product.name} size ${item.size}`);
                  // We could throw an error here to abort the order, but for now we'll just log
                  // throw new Error(`Insufficient stock for ${product.name}`);
              }
          } else {
              console.warn(`Size ${item.size} not found for product ${product.name}`);
          }
          
          await product.save();
        }
      }

      const createdOrder = await order.save();

      // 3. Remove ordered items from Wishlist
      const orderedProductIds = orderItems.map((item) => item.product); 
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: { $in: orderedProductIds } },
      });

      res.status(201).json(createdOrder);
    } catch (error) {
      console.error("Error in addOrderItems:", error);
      res.status(500).json({ message: "Order creation failed", error: error.message });
    }
  }
};

// @desc    Update order to delivered/shipped
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // 1. SCENARIO: MARK AS DELIVERED (Final Step)
    if (req.body.status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.status = 'Delivered';
        // We keep previous tracking info if it existed
    } 
    // 2. SCENARIO: MARK AS SHIPPED (Adding Tracking)
    else if (req.body.trackingId && req.body.courier) {
        order.status = 'Shipped';
        order.isDelivered = false; // Important: It is NOT delivered yet
        order.trackingInfo = {
            id: req.body.trackingId,
            courier: req.body.courier,
            status: 'Shipped'
        };
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Get logged in user orders
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Submit Return/Exchange Request
// @route   POST /api/orders/:id/return
// @access  Private
const submitReturnRequest = async (req, res) => {
    const { returnType, returnReason } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        // Validation: Can only return if delivered
        if (!order.isDelivered) {
            res.status(400).json({ message: 'Order must be delivered to request a return.' });
            return;
        }

        // Validation: Check return window (e.g., 7 days)
        const deliveryDate = new Date(order.deliveredAt);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - deliveryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if (diffDays > 7) {
            res.status(400).json({ message: 'Return window (7 days) has expired.' });
            return;
        }
        
        if (order.returnStatus !== 'None') {
            res.status(400).json({ message: 'Return request already submitted.' });
            return;
        }

        order.returnStatus = 'Requested';
        order.returnType = returnType;
        order.returnReason = returnReason;
        
        // Optionally update main status to indicate active return
        // order.status = `${returnType} Requested`; 

        const updatedOrder = await order.save();
        res.json(updatedOrder);

    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Submit Checkout Abandonment Survey
// @route   POST /api/orders/abandonment
// @access  Public (or Private if we have user info)
const AbandonmentSurvey = require('../models/AbandonmentSurvey');

const submitAbandonmentSurvey = async (req, res) => {
    const { reasons, comment, deviceInfo } = req.body;
    
    // Attempt to link to user if logged in, otherwise anonymous
    const userId = req.user ? req.user._id : null;

    try {
        const survey = await AbandonmentSurvey.create({
            user: userId,
            reasons,
            comment,
            deviceInfo
        });
        res.status(201).json(survey);
    } catch (error) {
        res.status(400).json({ message: 'Failed to submit survey' });
    }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderToDelivered, submitReturnRequest, submitAbandonmentSurvey };