#!/usr/bin/env node

/**
 * STEMSAGE Content Migration & Seed Script
 * Migrates hardcoded content from frontend into MongoDB.
 *
 * Usage:
 *   node scripts/seedContent.js [--dry-run]
 *   npm run seed:content
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Mongoose models
const Course = require('../src/models/Course');
const Workshop = require('../src/models/Workshop');
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');
const NewsItem = require('../src/models/NewsItem');
const Testimonial = require('../src/models/Testimonial');
const AssociationLogo = require('../src/models/AssociationLogo');
const InnovationDoor = require('../src/models/InnovationDoor');
const GalleryImage = require('../src/models/GalleryImage');

// Cloudinary service & config
const cloudinary = require('../src/config/cloudinary');

const isDryRun = process.argv.includes('--dry-run');

// Helper to create a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

/**
 * Upload local file path to Cloudinary safely.
 * Returns Cloudinary secure_url if successful, or existing url if already uploaded.
 */
async function uploadLocalImage(localPath, folder = 'stemsage/seed') {
  if (!localPath) return '';
  if (localPath.startsWith('http://') || localPath.startsWith('https://')) {
    return localPath; // Already a remote URL
  }

  if (isDryRun) {
    console.log(`[DRY-RUN] Would upload local file: ${localPath} -> Cloudinary (${folder})`);
    return `https://res.cloudinary.com/demo/image/upload/sample_${path.basename(localPath)}`;
  }

  const absolutePath = path.isAbsolute(localPath)
    ? localPath
    : path.resolve(__dirname, '../../', localPath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`⚠️ Warning: Local image file not found at ${absolutePath}, skipping image upload.`);
    return '';
  }

  try {
    const ext = path.extname(absolutePath).toLowerCase();
    const resourceType = ext === '.gif' ? 'image' : 'auto';

    const result = await cloudinary.uploader.upload(absolutePath, {
      folder,
      resource_type: resourceType
    });
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Cloudinary upload failed for ${absolutePath}:`, error.message);
    return '';
  }
}

async function runSeed() {
  console.log(`====================================================`);
  console.log(`🚀 Starting STEMSAGE Content Seed Script ${isDryRun ? '[DRY RUN MODE]' : ''}`);
  console.log(`====================================================\n`);

  if (!isDryRun) {
    if (!process.env.MONGO_URI) {
      console.error('❌ ERROR: MONGO_URI is missing from environment variables.');
      process.exit(1);
    }
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB.\n');
  }

  // Load ESM data files dynamically
  const frontendPath = path.resolve(__dirname, '../../frontend/src');
  const coursesModule = await import(path.join(frontendPath, 'data/courses.js'));
  const workshopsModule = await import(path.join(frontendPath, 'data/workshops.js'));
  const productsModule = await import(path.join(frontendPath, 'data/products.js'));

  // 1. COURSES MIGRATION
  console.log('--- 1. Migrating Courses ---');
  let coursesStats = { created: 0, updated: 0, skipped: 0 };
  const rawCourses = coursesModule.courses || [];

  for (let i = 0; i < rawCourses.length; i++) {
    const item = rawCourses[i];
    const query = { title: item.title };
    const updateData = {
      title: item.title,
      category: item.category,
      level: item.level,
      duration: item.duration,
      mode: item.mode,
      price: item.price,
      description: item.description,
      tags: item.tags || [],
      detail: item.detail || {},
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Course: "${item.title}"`);
      coursesStats.created++;
    } else {
      const existing = await Course.findOne(query);
      if (existing) {
        await Course.updateOne(query, updateData);
        coursesStats.updated++;
      } else {
        await Course.create(updateData);
        coursesStats.created++;
      }
    }
  }
  console.log(`Courses Summary: ${coursesStats.created} created, ${coursesStats.updated} updated, ${coursesStats.skipped} skipped.\n`);

  // 2. WORKSHOPS MIGRATION
  console.log('--- 2. Migrating Workshops ---');
  let workshopsStats = { created: 0, updated: 0, skipped: 0 };
  const rawWorkshops = workshopsModule.workshops || [];

  for (let i = 0; i < rawWorkshops.length; i++) {
    const item = rawWorkshops[i];
    const query = { title: item.title };
    const updateData = {
      title: item.title,
      category: item.category,
      date: item.date,
      duration: item.duration,
      location: item.location,
      level: item.level,
      seats: item.seats,
      seatsLeft: item.seatsLeft,
      status: item.status || 'OPEN',
      description: item.description,
      detail: item.detail || {},
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Workshop: "${item.title}"`);
      workshopsStats.created++;
    } else {
      const existing = await Workshop.findOne(query);
      if (existing) {
        await Workshop.updateOne(query, updateData);
        workshopsStats.updated++;
      } else {
        await Workshop.create(updateData);
        workshopsStats.created++;
      }
    }
  }
  console.log(`Workshops Summary: ${workshopsStats.created} created, ${workshopsStats.updated} updated, ${workshopsStats.skipped} skipped.\n`);

  // 3. PRODUCTS MIGRATION (Store data + OurProducts home components merged)
  console.log('--- 3. Migrating Products ---');
  let productsStats = { created: 0, updated: 0, skipped: 0 };
  const storeProducts = (productsModule.products || []).map((p) => ({
    title: p.name,
    slug: slugify(p.name),
    description: p.description,
    price: p.price,
    category: p.category,
    tags: p.tags || [],
    showOnHome: false,
    isFeatured: false
  }));

  const homeProducts = [
    {
      title: 'My STEM Box',
      subtitle: 'Hands-On Science & Discovery',
      features: ['20+ Hands-On STEM Activities', '5 Core Subjects Covered', 'Step-by-Step Activity Manuals', 'Self-Learning Video Tutorials'],
      price: 2999,
      category: 'STEM',
      tags: ['STEM', 'Science', 'Physics', 'Chemistry', 'Biology', 'Math'],
      showOnHome: true,
      isFeatured: false
    },
    {
      title: 'My Innovation Box',
      subtitle: 'Build, Code & Create',
      features: ['200+ Buildable Projects', '40 Essential Components', 'Digital Project Manuals', 'Self-Learning Resources'],
      price: 4999,
      category: 'Robotics',
      tags: ['Robotics', 'IoT', 'Electronics', 'Arduino', 'Programming'],
      showOnHome: true,
      isFeatured: true
    },
    {
      title: 'Smart Mont Lab',
      subtitle: 'Early Childhood STEM Learning',
      features: ['20+ Big Activity Sets', '12 STEM Activities per Year for Each Grade', 'Nursery, LKG & UKG Curriculum', 'Child-Friendly Furniture & Learning Materials'],
      price: 0,
      category: 'Montessori',
      tags: ['Montessori', 'Early Education', 'STEM', 'Lab Setup'],
      showOnHome: true,
      isFeatured: false
    },
    {
      title: 'STEMSAGE Smart Maker Space',
      subtitle: 'Innovation Hub for Schools & Colleges',
      features: ['Dedicated Innovation & Maker Space Setup', 'Robotics & Electronics Project Development', 'IoT & Smart Technology Exploration', '3D Printing & Rapid Prototyping'],
      price: 0,
      category: 'Maker Space',
      tags: ['Schools', 'Innovation', 'Robotics & AI', 'Lab Setup', 'Engineering'],
      showOnHome: true,
      isFeatured: false
    },
    {
      title: 'Yearlong Robotics & Physical AI Curriculum',
      subtitle: 'School-Wide Experiential Learning Program',
      features: ['10 Hands-On Learning Activities', 'Group-Based Robotics Kits', 'Teacher Training & Orientation', 'Dedicated STEMSAGE Host Trainer'],
      price: 0,
      category: 'Curriculum',
      tags: ['Robotics', 'Physical AI', 'STEM Education', 'School Curriculum'],
      showOnHome: true,
      isFeatured: true
    },
    {
      title: 'STEMSAGE Arduino Master Class',
      subtitle: 'From Circuits to Code — On Campus',
      features: ['20+ Hands-On Projects', 'Electronics & Embedded Systems Fundamentals', 'Arduino Programming & Circuit Design', '~20 Hours of Training'],
      price: 0,
      category: 'Master Class',
      tags: ['Arduino', 'Robotics', 'Electronics', 'Embedded Systems', 'Coding'],
      showOnHome: true,
      isFeatured: false
    }
  ].map((p) => ({
    title: p.title,
    slug: slugify(p.title),
    description: p.subtitle,
    price: p.price,
    category: p.category,
    features: p.features,
    tags: p.tags,
    showOnHome: p.showOnHome,
    isFeatured: p.isFeatured
  }));

  // Merge store + home products by title/slug
  const mergedProductsMap = new Map();
  [...storeProducts, ...homeProducts].forEach((item) => {
    if (mergedProductsMap.has(item.slug)) {
      const existing = mergedProductsMap.get(item.slug);
      mergedProductsMap.set(item.slug, {
        ...existing,
        ...item,
        showOnHome: existing.showOnHome || item.showOnHome,
        isFeatured: existing.isFeatured || item.isFeatured,
        features: item.features || existing.features || []
      });
    } else {
      mergedProductsMap.set(item.slug, item);
    }
  });

  const mergedProducts = Array.from(mergedProductsMap.values());

  for (let i = 0; i < mergedProducts.length; i++) {
    const item = mergedProducts[i];
    const query = { slug: item.slug };
    const updateData = {
      title: item.title,
      slug: item.slug,
      description: item.description || '',
      price: item.price || 0,
      category: item.category || 'General',
      images: [],
      features: item.features || [],
      tags: item.tags || [],
      isActive: true,
      isFeatured: item.isFeatured || false,
      showOnHome: item.showOnHome || false,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Product: "${item.title}" (slug: ${item.slug}, showOnHome: ${item.showOnHome})`);
      productsStats.created++;
    } else {
      const existing = await Product.findOne(query);
      if (existing) {
        await Product.updateOne(query, updateData);
        productsStats.updated++;
      } else {
        await Product.create(updateData);
        productsStats.created++;
      }
    }
  }
  console.log(`Products Summary: ${productsStats.created} created, ${productsStats.updated} updated, ${productsStats.skipped} skipped.\n`);

  // 4. SERVICES MIGRATION
  console.log('--- 4. Migrating Services ---');
  let servicesStats = { created: 0, updated: 0, skipped: 0 };
  const rawServices = [
    {
      title: 'Curriculums and Workshops',
      description: 'Structured, hands-on learning programs in STEM, Robotics, Physical AI, Innovation, Aviation, and emerging technologies, designed to develop practical skills throughout the academic year.',
      imagePath: 'frontend/src/assets/workshop-img.jpg',
      link: '/workshops',
      buttonText: 'Explore Programs'
    },
    {
      title: 'Smart Lab Setup',
      description: 'End-to-end lab setup solutions for schools and colleges, from STEM and Innovation Labs to advanced Engineering Labs, equipped with modern infrastructure, tools, and technology.',
      imagePath: 'frontend/src/assets/Edu-kit.webp',
      link: '/store',
      buttonText: 'Explore Lab Solutions'
    },
    {
      title: 'Industrial Training Programs',
      description: 'Industry-aligned technical training in Embedded Systems, Industrial IoT, Autonomous Robotics, ROS, VLSI, Industrial Automation, Drone Technology, and Advanced Circuit Design.',
      imagePath: 'frontend/public/images/hero-1.png',
      link: '/store',
      buttonText: 'Explore Training Programs'
    },
    {
      title: 'Teacher Capacity Building',
      description: 'Professional development programs in STEM, AI, Robotics, IoT, Design Thinking, and innovative teaching methodologies.',
      imagePath: 'frontend/public/images/hero-3.png',
      link: '/services',
      buttonText: 'Explore Programs'
    },
    {
      title: 'Digital Learning Ecosystem',
      description: 'Self-learning platforms, tutorial videos, educational resources, and digital curriculums that support flexible, technology-driven learning.',
      imagePath: 'frontend/public/images/hero-3.png',
      link: '/services',
      buttonText: 'Explore Platforms'
    }
  ];

  for (let i = 0; i < rawServices.length; i++) {
    const item = rawServices[i];
    const query = { title: item.title };

    let imageUrl = '';
    if (!isDryRun) {
      const existing = await Service.findOne(query);
      if (existing && existing.image && existing.image.includes('res.cloudinary.com')) {
        imageUrl = existing.image; // Keep existing Cloudinary URL
      } else {
        imageUrl = await uploadLocalImage(item.imagePath, 'stemsage/services');
      }
    } else {
      imageUrl = await uploadLocalImage(item.imagePath, 'stemsage/services');
    }

    const updateData = {
      title: item.title,
      description: item.description,
      image: imageUrl,
      buttonText: item.buttonText,
      link: item.link,
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Service: "${item.title}"`);
      servicesStats.created++;
    } else {
      const existing = await Service.findOne(query);
      if (existing) {
        await Service.updateOne(query, updateData);
        servicesStats.updated++;
      } else {
        await Service.create(updateData);
        servicesStats.created++;
      }
    }
  }
  console.log(`Services Summary: ${servicesStats.created} created, ${servicesStats.updated} updated, ${servicesStats.skipped} skipped.\n`);

  // 5. NEWS ITEMS MIGRATION
  console.log('--- 5. Migrating News Items ---');
  let newsStats = { created: 0, updated: 0, skipped: 0 };
  const rawNews = [
    {
      tag: 'Teacher Training',
      date: '7 Apr, 2026',
      title: 'UCOST launches 6-day AI & Robotics mentor training in Uttarakhand',
      imagePath: 'frontend/public/images/hero-2.png',
      link: '/workshops'
    },
    {
      tag: 'Student Projects',
      date: '27 Dec, 2025',
      title: "From a Class 9 science fair model to Gujarat State's Best Startup Project…",
      imagePath: 'frontend/public/images/hero-1.png',
      link: '/workshops'
    },
    {
      tag: 'Impact Programs',
      date: '23 Dec, 2025',
      title: 'How AI Education is Reaching Remote Schools Where Vehicles Cannot!',
      imagePath: 'frontend/public/images/hero-3.png',
      link: '/workshops'
    },
    {
      tag: 'Bootcamp',
      date: '15 Nov, 2025',
      title: '500 students explore Drone Technology at STEMSAGE National Bootcamp',
      imagePath: 'frontend/public/images/hero-2.png',
      link: '/workshops'
    },
    {
      tag: 'Lab Setup',
      date: '10 Oct, 2025',
      title: 'STEMSAGE sets up state-of-the-art Robotics Lab at DPS Jaipur',
      imagePath: 'frontend/public/images/hero-1.png',
      link: '/workshops'
    },
    {
      tag: 'Competition',
      date: '5 Sep, 2025',
      title: 'STEMSAGE students win Gold at National Science Olympiad 2025',
      imagePath: 'frontend/public/images/hero-3.png',
      link: '/workshops'
    }
  ];

  for (let i = 0; i < rawNews.length; i++) {
    const item = rawNews[i];
    const query = { title: item.title };

    let imageUrl = '';
    if (!isDryRun) {
      const existing = await NewsItem.findOne(query);
      if (existing && existing.image && existing.image.includes('res.cloudinary.com')) {
        imageUrl = existing.image;
      } else {
        imageUrl = await uploadLocalImage(item.imagePath, 'stemsage/news');
      }
    } else {
      imageUrl = await uploadLocalImage(item.imagePath, 'stemsage/news');
    }

    const updateData = {
      title: item.title,
      tag: item.tag,
      date: item.date,
      image: imageUrl,
      link: item.link,
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] NewsItem: "${item.title}"`);
      newsStats.created++;
    } else {
      const existing = await NewsItem.findOne(query);
      if (existing) {
        await NewsItem.updateOne(query, updateData);
        newsStats.updated++;
      } else {
        await NewsItem.create(updateData);
        newsStats.created++;
      }
    }
  }
  console.log(`NewsItems Summary: ${newsStats.created} created, ${newsStats.updated} updated, ${newsStats.skipped} skipped.\n`);

  // 6. TESTIMONIALS MIGRATION
  console.log('--- 6. Migrating Testimonials ---');
  let testimonialsStats = { created: 0, updated: 0, skipped: 0 };
  const rawTestimonials = [
    {
      type: 'text',
      quote: "Visiting the Surat Municipal Corporation's robotics lab and interacting with the students was a very delightful experience. In today's time, it is very important that students become familiar with subjects like AI and robotics and develop an innovative mindset.",
      name: 'Bhupendra Patel',
      role: 'CM of Gujarat',
      avatarPath: 'frontend/public/images/hero-2.png'
    },
    {
      type: 'video',
      videoSrc: '',
      name: 'Pushkar Singh Dhami',
      role: 'CM of Uttarakhand',
      avatarPath: 'frontend/public/images/hero-1.png'
    },
    {
      type: 'text',
      quote: "By integrating cutting-edge fields such as Artificial Intelligence and Robotics into our education ecosystem, we are preparing Uttarakhand's youth for future opportunities and inclusive growth, building a digitally competent, innovation-driven generation for the 21st century.",
      name: 'Pushkar Singh Dhami',
      role: 'CM of Uttarakhand',
      avatarPath: 'frontend/public/images/hero-1.png'
    },
    {
      type: 'text',
      quote: 'Today we inaugurated the AI & Robotics Lab, a first-of-its-kind initiative in Jamnagar. Aligned with the National Education Policy, it prioritises technology to develop crucial skills like Critical Thinking and Programming. This initiative will immensely benefit students and drive professional upgradation for teachers, ensuring education keeps moving forward.',
      name: 'Vipul Mehta',
      role: 'CEO, Jamnagar District',
      avatarPath: 'frontend/public/images/hero-3.png'
    },
    {
      type: 'text',
      quote: 'STEMbotix seamlessly integrates robotics with STEAM, revolutionising education. Their innovative curriculum cultivates problem-solving and creativity, exploring intersections of disciplines.',
      name: 'Mr. Davoud Jafari',
      role: 'Founder, ROBOTICS IRAN',
      avatarPath: 'frontend/public/images/hero-2.png'
    },
    {
      type: 'video',
      videoSrc: '',
      name: 'Shreshtha Singh',
      role: 'Student, DAPS Swaminirajan Vidyamandir',
      avatarPath: 'frontend/public/images/hero-3.png'
    },
    {
      type: 'text',
      quote: 'STEMbotix excels in quality educational materials & effective teaching methods simplifying complex STEM concepts. Strong commitment to advancing STEM education, nurturing problem-solving & creativity. Enthusiastically recommend for rewarding STEM journey.',
      name: 'Shreshtha Singh',
      role: 'Student, DAPS Swaminirajan Vidyamandir',
      avatarPath: 'frontend/public/images/hero-3.png'
    },
    {
      type: 'text',
      quote: 'The hands-on learning kits provided by STEMSAGE turned our science classroom into an active innovation lab. Students learn circuit design and programming with real enthusiasm.',
      name: 'Anand Verma',
      role: 'STEM Coordinator, Apex International',
      avatarPath: 'frontend/public/images/hero-2.png'
    },
    {
      type: 'text',
      quote: 'Organising the IoT & Robotics bootcamp with STEMSAGE was seamless. The students built working smart sensors in just two days. Truly an extraordinary experience!',
      name: 'Sneha Kulkarni',
      role: 'Head of Innovation Lab, Tech Campus',
      avatarPath: 'frontend/public/images/hero-3.png'
    }
  ];

  for (let i = 0; i < rawTestimonials.length; i++) {
    const item = rawTestimonials[i];
    const query = { name: item.name, role: item.role, type: item.type };

    let avatarUrl = '';
    if (!isDryRun) {
      const existing = await Testimonial.findOne(query);
      if (existing && existing.avatar && existing.avatar.includes('res.cloudinary.com')) {
        avatarUrl = existing.avatar;
      } else {
        avatarUrl = await uploadLocalImage(item.avatarPath, 'stemsage/testimonials');
      }
    } else {
      avatarUrl = await uploadLocalImage(item.avatarPath, 'stemsage/testimonials');
    }

    const updateData = {
      name: item.name,
      role: item.role,
      type: item.type,
      quote: item.quote || '',
      videoSrc: item.videoSrc || '',
      avatar: avatarUrl,
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Testimonial: "${item.name}" (${item.role})`);
      testimonialsStats.created++;
    } else {
      const existing = await Testimonial.findOne(query);
      if (existing) {
        await Testimonial.updateOne(query, updateData);
        testimonialsStats.updated++;
      } else {
        await Testimonial.create(updateData);
        testimonialsStats.created++;
      }
    }
  }
  console.log(`Testimonials Summary: ${testimonialsStats.created} created, ${testimonialsStats.updated} updated, ${testimonialsStats.skipped} skipped.\n`);

  // 7. ASSOCIATION LOGOS MIGRATION
  console.log('--- 7. Migrating Association Logos ---');
  let associationsStats = { created: 0, updated: 0, skipped: 0 };
  const rawLogos = [
    { name: 'CP', logoPath: 'frontend/src/assets/association_logos/CP.png' },
    { name: 'Droni Culture', logoPath: 'frontend/src/assets/association_logos/DroniCulture.webp' },
    { name: 'Madari Veda', logoPath: 'frontend/src/assets/association_logos/MadariVeda.jpg' },
    { name: 'Mentor Prep', logoPath: 'frontend/src/assets/association_logos/MentorPrep.webp' },
    { name: 'NMIMS', logoPath: 'frontend/src/assets/association_logos/NMIMS.svg' },
    { name: 'SES Education', logoPath: 'frontend/src/assets/association_logos/SES.png' }
  ];

  for (let i = 0; i < rawLogos.length; i++) {
    const item = rawLogos[i];
    const query = { name: item.name };

    let srcUrl = '';
    if (!isDryRun) {
      const existing = await AssociationLogo.findOne(query);
      if (existing && existing.src && existing.src.includes('res.cloudinary.com')) {
        srcUrl = existing.src;
      } else {
        srcUrl = await uploadLocalImage(item.logoPath, 'stemsage/associations');
      }
    } else {
      srcUrl = await uploadLocalImage(item.logoPath, 'stemsage/associations');
    }

    const updateData = {
      name: item.name,
      src: srcUrl,
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Association Logo: "${item.name}"`);
      associationsStats.created++;
    } else {
      const existing = await AssociationLogo.findOne(query);
      if (existing) {
        await AssociationLogo.updateOne(query, updateData);
        associationsStats.updated++;
      } else {
        await AssociationLogo.create(updateData);
        associationsStats.created++;
      }
    }
  }
  console.log(`Associations Summary: ${associationsStats.created} created, ${associationsStats.updated} updated, ${associationsStats.skipped} skipped.\n`);

  // 8. DOORS OF INNOVATION MIGRATION
  console.log('--- 8. Migrating Doors of Innovation ---');
  let doorsStats = { created: 0, updated: 0, skipped: 0 };
  const rawDoors = [
    { name: 'Electronics', gifPath: 'frontend/src/assets/innovations/electronics.gif' },
    { name: 'Robotics', gifPath: 'frontend/src/assets/innovations/robotics.gif' },
    { name: 'Internet of Things', gifPath: 'frontend/src/assets/innovations/InternetOfThings.gif' },
    { name: '3D Printing', gifPath: 'frontend/src/assets/innovations/3DPrinting.gif' },
    { name: 'Programming', gifPath: 'frontend/src/assets/innovations/Programming.gif' }
  ];

  for (let i = 0; i < rawDoors.length; i++) {
    const item = rawDoors[i];
    const query = { name: item.name };

    let gifUrl = '';
    if (!isDryRun) {
      const existing = await InnovationDoor.findOne(query);
      if (existing && existing.gif && existing.gif.includes('res.cloudinary.com')) {
        gifUrl = existing.gif;
      } else {
        gifUrl = await uploadLocalImage(item.gifPath, 'stemsage/innovations');
      }
    } else {
      gifUrl = await uploadLocalImage(item.gifPath, 'stemsage/innovations');
    }

    const updateData = {
      name: item.name,
      gif: gifUrl,
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Innovation Door: "${item.name}"`);
      doorsStats.created++;
    } else {
      const existing = await InnovationDoor.findOne(query);
      if (existing) {
        await InnovationDoor.updateOne(query, updateData);
        doorsStats.updated++;
      } else {
        await InnovationDoor.create(updateData);
        doorsStats.created++;
      }
    }
  }
  console.log(`Innovation Doors Summary: ${doorsStats.created} created, ${doorsStats.updated} updated, ${doorsStats.skipped} skipped.\n`);

  // 9. GALLERY IMAGES MIGRATION
  console.log('--- 9. Migrating Gallery Images ---');
  let galleryStats = { created: 0, updated: 0, skipped: 0 };
  const rawGallery = [
    { title: 'STEM Workshop Presentation', imagePath: 'frontend/src/assets/gallery/image_01.jpg' },
    { title: 'Hands-on Circuit Wiring', imagePath: 'frontend/src/assets/gallery/image_02.jpg' },
    { title: 'Robotics & Microcontroller Debugging', imagePath: 'frontend/src/assets/gallery/image_03.jpg' },
    { title: 'Design Thinking & Physical Computing', imagePath: 'frontend/src/assets/gallery/image_04.jpg' },
    { title: 'Computer Lab Workstation Session', imagePath: 'frontend/src/assets/gallery/image_05.jpg' },
    { title: 'Innovation Lab Setup', imagePath: 'frontend/src/assets/gallery/image_06.jpg' },
    { title: 'Group Hardware Prototyping', imagePath: 'frontend/src/assets/gallery/image_07.jpg' },
    { title: 'Electrical Measurements & Testing', imagePath: 'frontend/src/assets/gallery/image_08.png' },
    { title: 'Wireless Telemetry & Sensor Dashboard', imagePath: 'frontend/src/assets/gallery/image_09.jpg' },
    { title: 'Robotics Actuation & Kinematics', imagePath: 'frontend/src/assets/gallery/image_10.jpg' },
    { title: 'Workshop Tooling & Soldering Station', imagePath: 'frontend/src/assets/gallery/image_11.jpg' }
  ];

  for (let i = 0; i < rawGallery.length; i++) {
    const item = rawGallery[i];
    const query = { title: item.title };

    let imageUrl = '';
    if (!isDryRun) {
      const existing = await GalleryImage.findOne(query);
      if (existing && existing.image && existing.image.includes('res.cloudinary.com')) {
        imageUrl = existing.image;
      } else {
        imageUrl = await uploadLocalImage(item.imagePath, 'stemsage/gallery');
      }
    } else {
      imageUrl = await uploadLocalImage(item.imagePath, 'stemsage/gallery');
    }

    const updateData = {
      title: item.title,
      image: imageUrl,
      isActive: true,
      order: i + 1
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Gallery Image: "${item.title}"`);
      galleryStats.created++;
    } else {
      const existing = await GalleryImage.findOne(query);
      if (existing) {
        await GalleryImage.updateOne(query, updateData);
        galleryStats.updated++;
      } else {
        await GalleryImage.create(updateData);
        galleryStats.created++;
      }
    }
  }
  console.log(`Gallery Images Summary: ${galleryStats.created} created, ${galleryStats.updated} updated, ${galleryStats.skipped} skipped.\n`);

  console.log(`====================================================`);
  console.log(`🎉 Content Migration Completed Successfully ${isDryRun ? '[DRY RUN MODE]' : ''}`);
  console.log(`====================================================`);

  if (!isDryRun) {
    await mongoose.disconnect();
  }
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Fatal error during seedContent execution:', err);
  process.exit(1);
});
