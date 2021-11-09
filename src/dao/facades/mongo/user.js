const { getConnection } = require("../../db/atlas/db");
const _userModel = require("../../models/atlas/user");
const logger = require("../../../utils/logger");
const log = logger.getLogger("default");
const logFile = logger.getLogger("file");

class UserFacade {
  constructor() {
    try {
      getConnection();
      log.info("DB Connected");
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async getUserById(id) {
    try {
      const user = await _userModel.findById(id);
      return user;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await _userModel.findOne({ email });
      return user;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async getUserByEmailAndPassword(email, password) {
    try {
      const user = await _userModel.find({ email, password });
      return user;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }

  async addUser(user) {
    try {
      const userCreated = await _userModel.create(user);
      return userCreated;
    } catch (error) {
      log.error("ERROR:", error);
      logFile.error("ERROR:", error);
    }
  }
}

module.exports = UserFacade;
