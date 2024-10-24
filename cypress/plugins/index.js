const sendFailureEmail = require('../../send-email');

module.exports = (on, config) => {
  on('task', {
    sendEmail({ errorDetails }) {
      sendFailureEmail(errorDetails);
      return null;
    }
  });
};
