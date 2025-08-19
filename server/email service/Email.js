const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Use secure port
  secure: true, // Use SSL
  auth: {
    user: 'eocampo52@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, body) => {
  try {
    let mailOptions = {
      to,
      from: 'test.adam011@gmail.com',
      subject,
      html: body,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to allow caller to handle
  }
};

module.exports = sendEmail;
