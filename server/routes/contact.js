const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, subject, details } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.punjabac.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@punjabac.com',
      pass: process.env.EMAIL_PASSWORD // Use env variable for security
    }
  });

  const mailOptions = {
    from: 'info@punjabac.com',
    to: 'info@punjabac.com',
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${details}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = router; 