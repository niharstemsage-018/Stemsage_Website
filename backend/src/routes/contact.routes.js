const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const transporter = require('../config/mailer');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.'
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.'
      });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Subject is required.'
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone && typeof phone === 'string' ? phone.trim() : '';
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (trimmedMessage.length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 20 characters long.'
      });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot exceed 100 characters.'
      });
    }

    if (trimmedSubject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Subject cannot exceed 200 characters.'
      });
    }

    if (trimmedMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot exceed 5000 characters.'
      });
    }

    let newEnquiry;
    try {
      newEnquiry = await ContactMessage.create({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        subject: trimmedSubject,
        message: trimmedMessage
      });
    } catch (dbError) {
      console.error('Error saving contact message to MongoDB:', dbError.message);
      return res.status(500).json({
        success: false,
        message: 'Unable to send your message. Please try again later.'
      });
    }

    try {
      const submissionDate = newEnquiry.createdAt
        ? new Date(newEnquiry.createdAt).toISOString()
        : new Date().toISOString();

      const mailOptions = {
        from: `"STEMSAGE Website" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAILS,
        replyTo: trimmedEmail,
        subject: `New STEMSAGE Enquiry: ${trimmedSubject}`,
        text: `New enquiry received from STEMSAGE Website:

Name: ${trimmedName}
Email: ${trimmedEmail}
Phone: ${trimmedPhone || 'Not provided'}
Subject: ${trimmedSubject}

Message:
${trimmedMessage}

Submission Date/Time: ${submissionDate}`
      };

      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error('Error sending contact email via Nodemailer:', mailError.message);
      return res.status(500).json({
        success: false,
        message: 'Unable to send your message. Please try again later.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      data: {
        id: newEnquiry._id
      }
    });
  } catch (error) {
    console.error('Unexpected error in POST /api/contact:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message. Please try again later.'
    });
  }
});

module.exports = router;
