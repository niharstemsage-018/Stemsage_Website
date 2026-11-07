const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const transporter = require('./src/config/mailer');
const { publicRouter: contactRoutes, adminRouter: contactAdminRoutes } = require('./src/routes/contact.routes');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const { publicRouter: blogRoutes, adminRouter: blogAdminRoutes } = require('./src/routes/blog.routes');

// New content routes
const Product = require('./src/models/Product');
const Service = require('./src/models/Service');
const Course = require('./src/models/Course');
const Workshop = require('./src/models/Workshop');
const Testimonial = require('./src/models/Testimonial');
const NewsItem = require('./src/models/NewsItem');
const GalleryImage = require('./src/models/GalleryImage');
const AssociationLogo = require('./src/models/AssociationLogo');
const InnovationDoor = require('./src/models/InnovationDoor');
const { createCrudRoutes } = require('./src/utils/routes/crudRoutes');

const app = express();

app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration for both frontend and admin
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.ADMIN_ORIGIN || 'http://localhost:5174'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rate limiter for login routes only
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per window
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many login attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiter to login routes only
app.use('/api/auth/admin/login', loginLimiter);

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// Content routes (public + admin)
const models = [
  { name: 'products', model: Product, opts: { imageField: 'images', slugField: 'slug' } },
  { name: 'services', model: Service },
  { name: 'courses', model: Course },
  { name: 'workshops', model: Workshop },
  { name: 'testimonials', model: Testimonial },
  { name: 'news', model: NewsItem },
  { name: 'gallery', model: GalleryImage },
  { name: 'associations', model: AssociationLogo },
  { name: 'innovations', model: InnovationDoor }
];

models.forEach(({ name, model, opts }) => {
  const { publicRouter, adminRouter } = createCrudRoutes(model, opts);
  app.use(`/api/${name}`, publicRouter);
  app.use(`/api/admin/${name}`, adminRouter);
});

// Blog admin routes (GET all, PUT, PATCH publish, DELETE)
app.use('/api/admin/blogs', blogAdminRoutes);

// Contact message admin routes (GET all, PATCH status, DELETE)
app.use('/api/admin/contact', contactAdminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'STEMSAGE backend is running'
  });
});

module.exports = app;