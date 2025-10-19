const { User } = require('../../db');

module.exports = {
  async findById(id) {
    return await User.findByPk(id);
  },
  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  },
  async create(data) {
    return await User.create(data);
  }
};
