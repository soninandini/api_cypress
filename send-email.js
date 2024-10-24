
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// function sendFailureEmail(errorDetails = 'No error details provided') { 
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER, 
//       pass: process.env.EMAIL_PASSWORD, 
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'nan@gmail.com', 
//     subject: 'Cypress Test Failure: API Test Failed',
//     text: `The API test failed with the following details:\n\n${errorDetails}`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log('Error while sending email:', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }

// module.exports = sendFailureEmail;

const nodemailer = require('nodemailer');
// Loads environment variables from .env

function sendFailureEmail(errorDetails = 'No error details provided') {
  // Make sure the environment variables are loaded
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Email credentials not provided. Check your .env file.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your app password or Gmail password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'nan@gmail.com', // Recipient's email
    subject: 'Cypress Test Failure: API Test Failed',
    text: `The API test failed with the following details:\n\n${errorDetails}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error while sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
}

module.exports = sendFailureEmail;
