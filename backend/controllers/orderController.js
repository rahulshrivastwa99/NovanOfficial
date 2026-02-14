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
        // Find the specific size variant
        const sizeVariant = product.sizes.find(s => s.size === item.size);
        
        if (sizeVariant) {
            if (sizeVariant.stock >= item.qty) {
                sizeVariant.stock -= item.qty;
            } else {
                // Optional: Handle insufficient stock error here if needed
                console.log(`Insufficient stock for ${product.name} size ${item.size}`);
            }
        }
        
        await product.save();
      }
    }

    const createdOrder = await order.save();

    // 3. Remove ordered items from Wishlist
    const orderedProductIds = orderItems.map((item) => item.product); // Assuming item.product is the ID
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { wishlist: { $in: orderedProductIds } },
    });

    res.status(201).json(createdOrder);
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

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderToDelivered };