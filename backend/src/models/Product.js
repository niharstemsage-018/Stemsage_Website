const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  category: String,
  images: [{ url: String, publicId: String }],
  specs: [String],
  features: [String],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  showOnHome: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
