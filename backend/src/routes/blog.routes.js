const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth.middleware');

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
 * @desc    Create a new blog post (Admin only)
 * @access  Private (Admin)
 */
router.post('/', protect, async (req, res) => {
  try {
    // Only admin can create blogs
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required to create blog posts.'
      });
    }

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

    const isPublished = Boolean(published);

    const blog = await Blog.create({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt ? excerpt.trim() : '',
      content: content.trim(),
      coverImage: coverImage ? coverImage.trim() : '',
      author: req.user._id,
      category: category ? category.trim() : '',
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

module.exports = router;
