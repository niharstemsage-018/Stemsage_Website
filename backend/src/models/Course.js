const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  level: String,
  duration: String,
  mode: String,
  price: Number,
  description: String,
  tags: [String],
  detail: {
    overview: String,
    outcome: String,
    syllabus: [String]
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
