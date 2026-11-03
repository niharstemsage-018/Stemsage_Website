const mongoose = require('mongoose');

const innovationDoorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gif: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('InnovationDoor', innovationDoorSchema);