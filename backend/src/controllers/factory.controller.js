const { deleteFromCloudinary } = require('../services/cloudinary.service');

// Allowed query filters per model for PUBLIC list routes.
// Only whitelisted keys are applied; no operator injection.
// isActive is ALWAYS forced to true on public routes and is never exposed as a query param.
const QUERY_FILTERS = {
  products: {
    boolean: ['showOnHome', 'isFeatured'],
    string: ['category'],
    number: ['limit']
  },
  services: {
    boolean: [],
    string: ['category'],
    number: ['limit']
  },
  courses: {
    boolean: [],
    string: ['category', 'level', 'mode'],
    number: ['limit']
  },
  testimonials: {
    boolean: [],
    string: ['type'],
    number: ['limit']
  },
  news: {
    boolean: [],
    string: ['tag'],
    number: ['limit']
  },
  gallery: {
    boolean: [],
    string: [],
    number: ['limit']
  },
  associations: {
    boolean: [],
    string: [],
    number: ['limit']
  },
  innovations: {
    boolean: [],
    string: [],
    number: ['limit']
  }
};

function buildQueryFilter(modelName, query) {
  const config = QUERY_FILTERS[modelName];
  if (!config) return { filter: { isActive: true }, limit: null };

  // Public list routes always force isActive: true
  const filter = { isActive: true };

  if (config.boolean) {
    for (const key of config.boolean) {
      if (query[key] !== undefined) {
        const val = query[key];
        if (typeof val === 'string') {
          if (val.toLowerCase() === 'true') filter[key] = true;
          else if (val.toLowerCase() === 'false') filter[key] = false;
        } else if (typeof val === 'boolean') {
          filter[key] = val;
        }
      }
    }
  }

  if (config.string) {
    for (const key of config.string) {
      if (query[key] !== undefined && query[key] !== '') {
        // Never allow operator keys like category[$ne]=x
        if (key.includes('[') || key.includes('$')) continue;
        filter[key] = String(query[key]);
      }
    }
  }

  let limit = null;
  if (config.number && config.number.includes('limit')) {
    const n = parseInt(query.limit, 10);
    if (!isNaN(n) && n > 0) limit = n;
  }

  return { filter, limit };
}

const factory = {
  // Public: Get active items sorted by order, with optional whitelisted query filters
  getAll: (Model) => async (req, res) => {
    try {
      const { filter, limit } = buildQueryFilter(req.modelName, req.query);
      let q = Model.find(filter).sort({ order: 1 });
      if (limit) q = q.limit(limit);
      const data = await q;
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
