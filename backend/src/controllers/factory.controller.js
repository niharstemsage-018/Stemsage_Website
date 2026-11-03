const { deleteFromCloudinary } = require('../services/cloudinary.service');

const factory = {
  // Public: Get active items sorted by order
  getAll: (Model) => async (req, res) => {
    try {
      const data = await Model.find({ isActive: true }).sort({ order: 1 });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Public: Get one by ID
  getOne: (Model) => async (req, res) => {
    try {
      const data = await Model.findById(req.params.id);
      if (!data || !data.isActive) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Admin: Get all (including inactive)
  adminGetAll: (Model) => async (req, res) => {
    try {
      const data = await Model.find().sort({ order: 1 });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Admin: Create
  create: (Model) => async (req, res) => {
    try {
      const data = await Model.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Admin: Update (PUT)
  update: (Model) => async (req, res) => {
    try {
      const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!data) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Admin: Bulk Reorder
  reorder: (Model) => async (req, res) => {
    try {
      const { items } = req.body; // Expecting [{id, order}]
      await Promise.all(items.map(item => Model.findByIdAndUpdate(item.id, { order: item.order })));
      res.status(200).json({ success: true, message: 'Reordered successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Admin: Delete (Hard delete with Cloudinary cleanup)
  delete: (Model, imageField = 'image') => async (req, res) => {
    try {
      const data = await Model.findById(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: 'Not found' });

      // Clean up Cloudinary if exists
      const imageUrl = data[imageField] || (data.images && data.images[0]?.url);
      if (imageUrl) {
        await deleteFromCloudinary(imageUrl).catch(err => console.error('Cloudinary delete error:', err));
      }

      await data.deleteOne();
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = factory;
