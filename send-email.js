
const nodemailer = require('nodemailer');
require('dotenv').config();
function sendFailureEmail(errorDetails = 'No error details provided') { 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'nan@gmail.com', 
    subject: 'Cypress Test Failure: API Test Failed',
    text: `The API test failed with the following details:\n\n${errorDetails}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error while sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendFailureEmail;
