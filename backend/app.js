const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transporter = require('./src/config/mailer');
const contactRoutes = require('./src/routes/contact.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middleware
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'STEMSAGE backend is running'
  });
});

module.exports = app;