const sendEmail = require("@sendgrid/mail");
sendEmail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = sendEmail;
