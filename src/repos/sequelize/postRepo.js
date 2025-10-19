const { Post, PostImagen, Tag, User } = require('../../db');

module.exports = {
  async findById(id, opts = {}) {
    return await Post.findByPk(id, opts);
  },

  async create(data, opts = {}) {
    return await Post.create(data, opts);
  },

  async findAll(opts = {}) {
    return await Post.findAll(opts);
  },

  async addImages(postId, images = [], opts = {}) {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');
    const imgs = [];
    for (const img of images) {
      let found = await PostImagen.findOne({ where: { url: img.url }, transaction: opts.transaction });
      if (!found) {
        found = await PostImagen.create({ url: img.url, postId }, { transaction: opts.transaction });
      }
      imgs.push(found);
    }
    await post.addImagenes(imgs, { transaction: opts.transaction });
    return imgs;
  },

  async addTags(postId, tags = [], opts = {}) {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');
    const tagObjs = [];
    for (const t of tags) {
      const nombre = t.nombre || t.tag;
      let [tag] = await Tag.findOrCreate({ where: { nombre }, defaults: { nombre }, transaction: opts.transaction });
      tagObjs.push(tag);
    }
    await post.addTags(tagObjs, { transaction: opts.transaction });
    return tagObjs;
  },

  async withTransaction(cb) {
    return await Post.sequelize.transaction(cb);
  }
};
