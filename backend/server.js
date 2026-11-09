const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Fail fast if required environment variables are missing
const missingEnv = [];
if (!process.env.MONGO_URI) {
  missingEnv.push('database URI (MONGO_URI)');
}
if (!process.env.JWT_SECRET) {
  missingEnv.push('JWT_SECRET');
}

if (missingEnv.length > 0) {
  console.error(`FATAL: Server startup aborted. Missing required environment variable(s): ${missingEnv.join(', ')}.`);
  process.exit(1);
}

const app = require('./app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`STEMSAGE backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
