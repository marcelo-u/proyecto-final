require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  IS_CLUSTER: process.env.IS_CLUSTER,
  MONGO_URI: process.env.MONGO_URI || "",
  DB_SOURCE: process.env.DB_SOURCE || 1,
  MYSQL_ENV: process.env.MYSQL_ENV || "development",
  ADMIN: process.env.ADMIN || false,
  COOKIE_SECRET: process.env.COOKIE_SECRET || "default",
  TWILIO_FROM_WHATSAPP: process.env.TWILIO_FROM_WHATSAPP,
  ACCOUNT_TWILIO_SID: process.env.ACCOUNT_TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  ETHEREAL_PASS: process.env.ETHEREAL_PASS,
  ADMIN_EMAIL_ACCOUNT: process.env.ADMIN_EMAIL_ACCOUNT,
  TWILIO_ADMIN_WHATSAPP: process.env.TWILIO_ADMIN_WHATSAPP,
  ETHEREAL_CONFIG: {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_EMAIL,
      pass: process.env.ETHEREAL_PASS,
    },
  },
  GMAIL_CONFIG: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  },
};
