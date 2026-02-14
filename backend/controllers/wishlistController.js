const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) {
       return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error in getWishlist:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/add
// @access  Private
const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    if (!req.user) {
       return res.status(401).json({ message: "User not authenticated" });
    }
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Use $addToSet to avoid duplicates automatically and atomic update
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');

    if (!user) {
       return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from wishlist
// @route   POST /api/wishlist/remove
// @access  Private
const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    // Use $pull to remove item atomicaly
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
   }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };  