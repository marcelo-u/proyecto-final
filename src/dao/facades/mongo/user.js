const { getConnection } = require("../../db/atlas/db");

const _userModel = require("../../models/atlas/user");

class UserFacade {
  constructor() {
    getConnection();
  }

  async getUserById(id) {
    const user = await _userModel.findById(id);
    return user;
  }

  async getUserByEmail(email) {
    const user = await _userModel.findOne({ email });
    return user;
  }

  async getUserByEmailAndPassword(email, password) {
    const user = await _userModel.find({ email, password });
    return user;
  }

  async addUser(user) {
    const userCreated = await _userModel.create(user);
    return userCreated;
  }
}

module.exports = UserFacade;
