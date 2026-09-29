const jwt = require('jsonwebtoken');

/**
 * Generates a STEMSAGE JWT token.
 * @param {Object} payload - Token payload ({ userId, role }).
 * @param {string} [expiresIn='7d'] - Expiration duration.
 * @returns {string} JWT token string.
 */
const generateToken = (payload, expiresIn = '7d') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured in environment variables.');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verifies a STEMSAGE JWT token.
 * @param {string} token - JWT token string to verify.
 * @returns {Object} Decoded payload.
 */
const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured in environment variables.');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};
