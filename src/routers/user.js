const passport = require("passport");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/tokenVerifier");

const { register, login, user, whoami } = require("../controllers/user");

module.exports = (router) => {
  router.post("/user/register", register);

  router.post("/user/login", login);

  //remover
  router.get("/user", (req, res, next) => {
    res.json(req.user);
  });

  router.get("/whoami", verifyToken, whoami);

  return router;
};
