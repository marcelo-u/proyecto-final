const ShoppingCartService = require("../services/shoppingcart");
const NotificationsService = require("../services/notifications");
const {
  TWILIO_ADMIN_WHATSAPP,
  ADMIN_EMAIL_ACCOUNT,
} = require("../config/globals");

const service = new ShoppingCartService();
const notificationService = new NotificationsService();

//Tested
exports.getShoppingCartByUserId = async (req, res, next) => {
  const { user_id: user } = req.params;
  const shoppingCart = await service.getShoppingCart(user);
  res.send(shoppingCart);
};

//Tested
exports.addShoppingCartByUserId = async (req, res, next) => {
  const { user_id: user } = req.params;
  const products = req.body;
  const shoppingCartCreated = await service.addShoppingCart({
    timestamp: Date.now(),
    user,
    products: products,
  });
  res.send(shoppingCartCreated);
};

//Update
exports.updateShoppingCartByUserId = async (req, res, next) => {
  const { user_id: user } = req.params;
  const products = req.body;
  const shoppingCartUpdated = await service.updateShoppingCart(user, {
    products,
  });
  res.send(shoppingCartUpdated);
};

exports.deleteShoppingCartByUserId = async (req, res, next) => {
  const { id_user: user } = req.params;
  const deleted = await service.removeShoppingCart(user);
  res.send(deleted);
};

exports.deleteShoppingCartById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id + " received");
  const deleted = await service.removeShoppingCartById(id);
  res.send(deleted);
};

exports.checkout = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const deleted = await service.removeShoppingCart(data.user);

  const emailContent = `<h1>pedido de ${data.user.name}</h1><br/>
                        ${data.items.map(({ nombre }) => `${nombre}<br/>`)}`;
  let whatsappContent = `_orden de ${data.user.name} - ${data.user.phone}_
  `;
  whatsappContent += data.items.map(
    ({ codigo, nombre }) => `-${nombre}[${codigo}]
  `
  );
  await notificationService.sendMail(
    ADMIN_EMAIL_ACCOUNT,
    `Nueva orden!`,
    emailContent
  );
  await notificationService.sendWhatsapp(
    TWILIO_ADMIN_WHATSAPP,
    whatsappContent
  );

  res.send(deleted);
};
