const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

/**
 * Middleware to protect routes that require authentication.
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This account is inactive.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid token'
    });
  }
};

/**
 * Middleware to require admin role.
 */
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no user found'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: Admin privileges required'
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access forbidden'
    });
  }
};

module.exports = {
  protect,
  requireAdmin
};
