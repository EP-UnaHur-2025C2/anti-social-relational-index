const { Comment, User } = require('../../db');

module.exports = {
  async findById(id) {
    return await Comment.findByPk(id);
  },
  async create(data) {
    return await Comment.create(data);
  },
  async update(id, data) {
    const c = await Comment.findByPk(id);
    if (!c) throw new Error('Comment not found');
    return await c.update(data);
  }
};
