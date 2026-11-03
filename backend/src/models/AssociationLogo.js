const mongoose = require('mongoose');

const associationLogoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('AssociationLogo', associationLogoSchema);
