const factory = require("../dao/factory");
const { UserFacade } = factory();
_uf = new UserFacade();
const logger = require("../utils/logger");
const log = logger.getLogger("default");

module.exports = class {
  async getUserById(id) {
    log.info("Retrieving user with id", id);
    const user = await _uf.getUserById(id);
    log.info("User found:", user);
    return user;
  }

  async getUserByEmail(email) {
    log.info("Retrieving user with email", email);
    const user = await _uf.getUserByEmail(email);
    log.info("User found:", user);
    return user;
  }

  async addUser(user) {
    log.info("Adding user", user);
    const userCreated = await _uf.addUser(user);
    log.info("User added", userCreated);
    return userCreated;
  }
};
