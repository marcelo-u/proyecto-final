const factory = require("../dao/factory");
const { UserFacade } = factory();
_uf = new UserFacade();

module.exports = class {
  async getUserById(id) {
    const user = await _uf.getUserById(id);
    return user;
  }

  async getUserByEmail(email) {
    const user = await _uf.getUserByEmail(email);
    return user;
  }

  async addUser(user) {
    const userCreated = await _uf.addUser(user);
    return userCreated;
  }
};
