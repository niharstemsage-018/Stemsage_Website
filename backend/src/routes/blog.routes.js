const express = require('express');
const router = express.Router();
const adminRouter = express.Router();
const Blog = require('../models/Blog');
const { protect, requireAdmin } = require('../middleware/auth.middleware');
const { deleteFromCloudinary } = require('../services/cloudinary.service');

// Helper to create a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

/**
 * @route   GET /api/blogs
 * @desc    Get all published blog posts
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, tag } = req.query;
    const query = { published: true };

    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name profilePicture email')
      .sort({ publishedAt: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Fetch blogs error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching blog posts.'
    });
  }
});

/**
 * @route   GET /api/blogs/:slug
 * @desc    Get a single published blog post by slug
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug: slug.toLowerCase(), published: true })
      .populate('author', 'name profilePicture email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        blog
      }
    });
  } catch (error) {
    console.error('Fetch blog by slug error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching blog post.'
    });
  }
});

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog post
 * @access  Authenticated
 */
router.post('/', protect, async (req, res) => {
  try {
    const { title, slug, excerpt, content, coverImage, category, tags, published } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required.'
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Content is required.'
      });
    }

    let finalSlug = slug ? slugify(slug) : slugify(title);

    // Ensure slug uniqueness
    const existingBlog = await Blog.findOne({ slug: finalSlug });
    if (existingBlog) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    const isPublished = published !== undefined ? Boolean(published) : true;

    const blog = await Blog.create({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt ? excerpt.trim() : content.trim().substring(0, 160),
      content: content.trim(),
      coverImage: coverImage ? coverImage.trim() : '',
      author: req.user._id,
      category: category ? category.trim() : 'General',
      tags: Array.isArray(tags) ? tags : [],
      published: isPublished,
      publishedAt: isPublished ? new Date() : null
    });

    const populatedBlog = await Blog.findById(blog._id).populate('author', 'name profilePicture email');

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully.',
      data: {
        blog: populatedBlog
      }
    });
  } catch (error) {
    console.error('Create blog error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error creating blog post.'
    });
  }
});

/* ==================== ADMIN ROUTES ==================== */

/**
 * @route   GET /api/admin/blogs
 * @desc    Get all blog posts (published & draft)
 * @access  Admin
 */
adminRouter.get('/', protect, requireAdmin, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name profilePicture email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Admin fetch blogs error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching blogs.'
    });
  }
});

/**
 * @route   PUT /api/admin/blogs/:id
 * @desc    Update a blog post
 * @access  Admin
 */
adminRouter.put('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, coverImage, category, tags, published } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.'
      });
    }

    if (title !== undefined) blog.title = title.trim();
    if (slug !== undefined) blog.slug = slugify(slug);
    if (excerpt !== undefined) blog.excerpt = excerpt.trim();
    if (content !== undefined) blog.content = content.trim();
    if (coverImage !== undefined) blog.coverImage = coverImage.trim();
    if (category !== undefined) blog.category = category.trim();
    if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : [];

    if (published !== undefined) {
      blog.published = Boolean(published);
      if (blog.published && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }
    }

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id).populate('author', 'name profilePicture email');

    return res.status(200).json({
      success: true,
      message: 'Blog post updated successfully.',
      data: updatedBlog
    });
  } catch (error) {
    console.error('Admin update blog error:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   PATCH /api/admin/blogs/:id/publish
 * @desc    Toggle or update blog published status
 * @access  Admin
 */
adminRouter.patch('/:id/publish', protect, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.'
      });
    }

    const { published } = req.body;
    blog.published = published !== undefined ? Boolean(published) : !blog.published;
    if (blog.published && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: `Blog ${blog.published ? 'published' : 'unpublished'} successfully.`,
      data: blog
    });
  } catch (error) {
    console.error('Admin publish blog error:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   DELETE /api/admin/blogs/:id
 * @desc    Delete a blog post
 * @access  Admin
 */
adminRouter.delete('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.'
      });
    }

    if (blog.coverImage) {
      await deleteFromCloudinary(blog.coverImage).catch((err) => {
        console.error('Cloudinary blog cover delete error:', err.message);
      });
    }

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully.'
    });
  } catch (error) {
    console.error('Admin delete blog error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error deleting blog post.'
    });
  }
});

module.exports = {
  publicRouter: router,
  adminRouter
};
