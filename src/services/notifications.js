const nodemailer = require("nodemailer");
const moment = require("moment");
const {
  ACCOUNT_TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_WHATSAPP,
  ETHEREAL_CONFIG,
  GMAIL_CONFIG,
} = require("../config/globals");

const twilioClient = require("twilio")(ACCOUNT_TWILIO_SID, TWILIO_AUTH_TOKEN);

module.exports = class {
  async sendMail(to, subject, content) {
    try {
      //registra si la acción viene de log-in o log-out y usa el nombre de usuario
      await sendFromGmail(to, subject, content);
      //solo dispara el mail de gmail si la cuenta es proveniente de facebook
    } catch (error) {
      console.log("test" + error);
    }
  }

  async sendWhatsapp(to, message) {
    try {
      sendFromTwilio(to, message);
    } catch (error) {
      //loguea en caso de que falle
    }
  }
};

//Metodo que dispara el whatsapp via twilio
const sendFromTwilio = async (to, message) => {
  await twilioClient.messages.create({
    from: "whatsapp:" + TWILIO_FROM_WHATSAPP,
    to: "whatsapp:" + to,
    body: `${message}`,
  });
};

//Metodo que dispara el email desde Ethereal de/hacia una cuenta administrador
const sendFromEthereal = async (to, subject, content) => {
  const transporter = nodemailer.createTransport(ETHEREAL_CONFIG);
  await transporter.sendMail({
    from: '"[Mailer]" do-not-reply@emailnotification.com',
    to: to,
    subject: subject,
    html: content,
  });
};

const sendFromGmail = async (to, subject, content) => {
  const transporterGmail = nodemailer.createTransport(GMAIL_CONFIG);
  await transporterGmail.sendMail({
    from: '"[Mailer]" do-not-reply@emailnotification.com',
    to,
    subject,
    html: content,
  });
};
