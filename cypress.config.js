const { defineConfig } = require('cypress');
const sendFailureEmail = require('./send-email'); // Import your send-email.js script

module.exports = defineConfig({
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

