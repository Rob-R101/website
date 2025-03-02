const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  console.log("🔹 Incoming request:", event.httpMethod);
  console.log("🔹 Event body:", event.body);

  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let data;
  try {
    data = event.body ? JSON.parse(event.body) : {};
    console.log("✅ Parsed Data:", data);
  } catch (error) {
    console.error("❌ Error parsing request body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body. Must be JSON.' }),
    };
  }

  // Validate required fields
  const { name, email, subject, message } = data;
  if (!name || !email || !subject || !message) {
    console.error("❌ Missing required fields:", { name, email, subject, message });
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please complete the form and try again.' }),
    };
  }

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing SMTP credentials!");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SMTP credentials are not set in environment variables.' }),
    };
  }

  console.log("🔹 Using SMTP credentials:", {
    user: process.env.EMAIL_USER,
    pass: "********", // Hiding actual password for security
  });

  // Configure Nodemailer transport
  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify SMTP connection
  try {
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send emails.");
  } catch (error) {
    console.error("❌ SMTP Connection Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `SMTP Connection Error: ${error.message}` }),
    };
  }

  // Email configuration
  let mailOptions = {
    from: `"Robert Roffey Contact Form" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: 'roffeyre@gmail.com',
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response); // Log SMTP response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' })
    };

  } catch (error) {
    console.error("SMTP Error:", error);
    return { statusCode: 500, body: `Message could not be sent. Error: ${error.message}` };
  }

};
