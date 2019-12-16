// https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
const sendEmail = require("@sendgrid/mail");
sendEmail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = sendEmail;
