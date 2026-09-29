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

const User = require('../models/User');

// Middleware allowing any user (authenticated or guest fallback) to post
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const { verifyToken } = require('../utils/jwt');
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId).select('-password');
        if (user && user.isActive) {
          req.user = user;
          return next();
        }
      } catch (err) {
        // Token invalid/expired, fall through to guest author
      }
    }

    // Default guest author for public postings
    let guestUser = await User.findOne({ email: 'community@stemsage.cc' });
    if (!guestUser) {
      guestUser = await User.create({
        name: 'Community Member',
        email: 'community@stemsage.cc',
        role: 'user',
        authProvider: 'local',
        isEmailVerified: true,
        isActive: true
      });
    }
    req.user = guestUser;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog post (Public / Anyone)
 * @access  Public
 */
router.post('/', optionalAuth, async (req, res) => {
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

module.exports = router;
