const mongoose = require('mongoose');

const newsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: String,
  date: String,
  image: String,
  link: String,
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('NewsItem', newsItemSchema);
