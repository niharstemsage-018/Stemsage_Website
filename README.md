# STEMSAGE Web Platform

Full-stack web application, administrative content management dashboard, and API backend for **STEMSAGE Techworld**, enabling STEM education, hands-on workshops, course management, educational products, and community blogs.

---

## Architecture Overview

```
Stemsage_Website/
├── backend/          # Node.js / Express REST API & MongoDB Data Layer
├── frontend/         # Public React 19 Client Website (Vite + Tailwind CSS v4)
├── admin/            # Administrative Content Management Dashboard (React 19 + Vite)
├── docs/             # Product and navigation documentation
└── PROGRESS.md       # Project milestone tracking and verification logs
```

- **Backend (`backend/`)**: Express 5 REST API connecting to MongoDB via Mongoose. Features role-based access control (RBAC), JWT authentication, Google OAuth verification, Cloudinary media storage, nodemailer contact dispatching, and rate limiting.
- **Frontend (`frontend/`)**: Public website featuring dynamic data integration with graceful offline/outage fallbacks for all content sections (courses, workshops, products, services, testimonials, news highlights, gallery, associations, innovations, and blogs).
- **Admin App (`admin/`)**: Dedicated administrative dashboard with authentication, interactive data tables, Zod-validated forms, image uploads, and live status toggles for all content types.

---

## Environment Variables

Copy each `.env.example` to `.env` in the respective directory:

### 1. Backend (`backend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `MONGO_URI` | MongoDB connection string (Required) | `mongodb://localhost:27017/stemsage` |
| `PORT` | HTTP server port | `5000` |
| `NODE_ENV` | Runtime environment | `development` |
| `JWT_SECRET` | Secret key for JWT signing & verification (Required) | `your_jwt_secret` |
| `JWT_EXPIRE` | Token validity duration | `7d` |
| `FRONTEND_URL` | Allowed origin(s) for frontend CORS (comma-separated) | `http://localhost:5173` |
| `ADMIN_ORIGIN` | Allowed origin(s) for admin CORS (comma-separated) | `http://localhost:5174` |
| `GOOGLE_CLIENT_ID` | Google OAuth Web Client ID | `your_google_client_id` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API access key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API access secret | `your_api_secret` |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port (`587` for STARTTLS, `465` for SSL) | `587` |
| `EMAIL_USER` | SMTP username / address | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | SMTP password or app-specific password | `your_app_password` |
| `CONTACT_EMAILS` | Target recipient email for contact enquiries | `info@stemsage.com` |
| `ADMIN_EMAIL` | Email used by `scripts/createAdmin.js` | `admin@stemsage.com` |
| `ADMIN_PASSWORD` | Password used by `scripts/createAdmin.js` | `your_secure_password` |

### 2. Frontend (`frontend/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Root URL of backend API | `http://localhost:5000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID for sign-in button | `your_google_client_id` |

### 3. Admin (`admin/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base API URL prefix for admin client | `http://localhost:5000/api` |

---

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or MongoDB Atlas)

### Step 1: Install Dependencies
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install

# Admin dependencies
cd ../admin && npm install
cd ..
```

### Step 2: Initialize Database and Admin Account
```bash
# Seed initial content (dry run preview)
cd backend && npm run seed:content:dry-run

# Seed initial content to MongoDB
npm run seed:content

# Create or promote admin user
node scripts/createAdmin.js
```

### Step 3: Run Development Servers
In separate terminal windows:
```bash
# Terminal 1: Backend API (port 5000)
cd backend && npm run dev

# Terminal 2: Public Frontend Website (port 5173)
cd frontend && npm run dev

# Terminal 3: Admin Dashboard (port 5174)
cd admin && npm run dev
```

---

## Production Build & Verification

```bash
# Build frontend
cd frontend && npm run build

# Build admin dashboard
cd ../admin && npm run build

# Start production backend
cd ../backend && npm start
```

---

## Deployment Guidelines

### Frontend & Admin (Vercel)
Both `frontend/` and `admin/` contain `vercel.json` with SPA route rewrites:
- Deploy `frontend/` as a static/Vite project with root directory set to `frontend`.
- Deploy `admin/` as a static/Vite project with root directory set to `admin`.
- Configure `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` in Vercel project settings.

### Backend (Node.js Host)
- Deploy `backend/` to any Node.js container or cloud host (Render, Railway, Fly.io, AWS, DigitalOcean).
- Set `NODE_ENV=production`.
- Configure all backend environment variables (`MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, `ADMIN_ORIGIN`, Cloudinary, SMTP).
- `FRONTEND_URL` and `ADMIN_ORIGIN` support comma-separated lists of production and staging origins.

