// const nodemailer = require('nodemailer');
// require('dotenv').config(); 


// const sendEmail = (subject, text) => {
  
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,  
//     auth: {
//       user: process.env.EMAIL_USER,  
//       pass: process.env.EMAIL_PASSWORD  
//     }
//   });

 
//   console.log('Transporter created with config:', {
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     user: process.env.EMAIL_USER,
//   });

 
//   const mailOptions = {
//     from: `"API Test Suite" <${process.env.EMAIL_USER}>`,  
//     to: 'happynandini.006@gmail.com',  
//     subject: subject,  
//     text: text  
//   };

 
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error('Error while sending email:', error);
//     }
//     console.log('Email sent successfully:', info.response);
//   });
// };

// module.exports = sendEmail;
