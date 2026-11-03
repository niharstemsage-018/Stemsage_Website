#!/usr/bin/env node

require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const connectDB = require('../src/config/db');

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file');
      process.exit(1);
    }

    console.log(`Checking for existing admin user: ${adminEmail}`);

    // Check if admin already exists
    let adminUser = await User.findOne({ email: adminEmail });

    if (adminUser) {
      console.log('Admin user already exists. Promoting to admin role...');
      // Verify it's already admin
      if (adminUser.role === 'admin') {
        console.log('User is already an admin.');
        // Optionally update password if provided
        console.log('Updating password for existing admin...');
        const salt = await bcrypt.genSalt(10);
        adminUser.password = await bcrypt.hash(adminPassword, salt);
        await adminUser.save();
        console.log('Password updated successfully.');
      } else {
        adminUser.role = 'admin';
        const salt = await bcrypt.genSalt(10);
        adminUser.password = await bcrypt.hash(adminPassword, salt);
        await adminUser.save();
        console.log('User promoted to admin role successfully.');
      }
    } else {
      console.log('Creating new admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        authProvider: 'local',
        isEmailVerified: true,
        isActive: true
      });

      console.log('Admin user created successfully!');
    }

    console.log('\nAdmin User Details:');
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
    console.log('ID:', adminUser._id);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdmin();