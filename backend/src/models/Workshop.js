const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  date: String,
  duration: String,
  location: String,
  level: String,
  seats: Number,
  seatsLeft: Number,
  status: { type: String, default: 'OPEN' },
  description: String,
  detail: {
    schedule: String,
    includes: [String]
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Workshop', workshopSchema);
