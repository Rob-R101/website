// send_email.js
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const data = JSON.parse(event.body);
  const { name, email, subject, message } = data;

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: 'Please complete the form and try again.',
    };
  }

  // Configure the SMTP transport using Namecheap Private Email
  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'contact@robertroffey.uk',
      pass: 'ArthurWilliamGeorge!',
    },
  });

  // Email Content
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'roffeyre@gmail.com',
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Message has been sent successfully.',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Message could not be sent. Error: ${error.message}`,
    };
  }
};
