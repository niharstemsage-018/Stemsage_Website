const nodemailer = require('nodemailer');

console.log('📧 mailer.js loaded');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => {
    console.log('✅ SMTP connection successful');
  })
  .catch((error) => {
    console.error('❌ SMTP connection failed:');
    console.error(error.message);
  });

module.exports = transporter;