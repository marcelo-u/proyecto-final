const logger = require("../utils/logger");
const log = logger.getLogger("default");
const logFile = logger.getLogger("file");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    log.warn("Authorization Token is not present");
    res.sendStatus(403);
  }
};

module.exports = { verifyToken };
