const { defineConfig } = require('cypress');
const sendFailureEmail = require('./send-email'); // Import your send-email.js script
require('dotenv').config();

module.exports = defineConfig({
  env: {
    EMAIL_USER: process.env.EMAIL_USER, // Access from .env
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD, // Access from .env
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        sendEmail({ subject, text }) {
          return new Promise((resolve, reject) => {
            sendFailureEmail(text); // Pass the email body directly
            resolve(null); // Resolve the promise
          });
        },
      });
    },
  
    video: false,
    watchForFileChanges: false,
  }
});

