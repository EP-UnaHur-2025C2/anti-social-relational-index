'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'usuarioId', as: 'usuario' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }
  Comment.init({
    texto: DataTypes.STRING,
    visible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};