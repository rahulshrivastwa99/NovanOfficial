const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  sizes: [String],
  colors: [
    {
      name: { type: String },
      hex: { type: String }
    }
  ],
  images: [String],
  // Using 'Object' for stock allows the { S: 15, M: 20 } structure
  stock: { type: Object, required: true }, 
  isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);