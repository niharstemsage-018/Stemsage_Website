const express = require('express');
const factory = require('../../controllers/factory.controller');
const { protect, requireAdmin } = require('../../middleware/auth.middleware');

function createCrudRoutes(Model, options = {}) {
  const router = express.Router();
  const { imageField = 'image', slugField } = options;

  // Public routes
  router.get('/', factory.getAll(Model));
  router.get('/:id', factory.getOne(Model));

  // Slug-based lookup (for products)
  if (slugField) {
    router.get(`/slug/:${slugField}`, async (req, res) => {
      try {
        const data = await Model.findOne({ [slugField]: req.params[slugField], isActive: true });
        if (!data) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });
  }

  // Admin routes (protected by auth + requireAdmin)
  // Mounted at /api/admin/<name> by the caller
  const adminRouter = express.Router();

  // Reorder must be declared BEFORE :id to avoid collision
  adminRouter.post('/reorder', protect, requireAdmin, factory.reorder(Model));
  adminRouter.post('/', protect, requireAdmin, factory.create(Model));
  adminRouter.put('/:id', protect, requireAdmin, factory.update(Model));
  adminRouter.delete('/:id', protect, requireAdmin, factory.delete(Model, imageField));
  adminRouter.get('/', protect, requireAdmin, factory.adminGetAll(Model));

  return { publicRouter: router, adminRouter };
}

module.exports = { createCrudRoutes };