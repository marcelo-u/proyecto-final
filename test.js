const NotificationsService = require("./src/services/notifications");
const service = new NotificationsService();

const testEmail = async () => {
  await service.sendMail(
    "isai.quigley2@ethereal.email", //fvdFA4HM5CN4HGft9j
    "mail",
    "esto es una prueba"
  );
};

const testPhone = async () => {
  await service.sendWhatsapp(
    "+5491137878904",
    "Su pedido está siendo procesado..."
  );
};

//testEmail();
//testPhone();
