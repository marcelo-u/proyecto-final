const UserService = require("../services/user");
const NotificationsService = require("../services/notifications");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ADMIN_EMAIL_ACCOUNT } = require("../config/globals");

const service = new UserService();
const notificationService = new NotificationsService();

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(401).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;

        jwt.sign({ user }, "secretKey", (err, token) => {
          res.send({ user, token });
        });
      });
    }
  })(req, res, next);
};

exports.register = async (req, res, next) => {
  const { body: user } = req;
  const found = await service.getUserByEmail(user.email);
  try {
    if (found) {
      res.json({ msg: "user exist" });
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userCreated = await service.addUser({
        ...user,
        password: hashedPassword,
      });

      const emailContent = `
        <div><h3>Datos de registro</h3></div>
        <div>email: ${user.email}</div>
        <div>nombre: ${user.name}</div>
        <div>telefono: ${user.phone}</div>
        <div>direccion: ${user.address}</div>
        <div>edad: ${user.age}</div>`;

      await notificationService.sendMail(
        ADMIN_EMAIL_ACCOUNT,
        "Nuevo registro",
        emailContent
      );
      res.status(201).json(userCreated);
    }
  } catch (err) {
    res.json({ msg: err });
  }
};

exports.whoami = (req, res, next) => {
  jwt.verify(req.token, "secretKey", (error, content) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({ content });
    }
  });
};

exports.getUser = async (req, res, next) => {
  res.send(req.user);
};
