'use strict';
const {
  Model
} = require('sequelize');
const meses = process.env.COMMENT_VISIBLE_MONTHS || 6
const milisegundos = meses * 30.5 * 24 * 60 * 60 * 1000

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
    visible: {
      type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['createdAt']),
      get: function (){
        return (new Date() - new Date(this.get('createdAt'))) < milisegundos;
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};