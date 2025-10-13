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
    visible: {
      type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['createdAt']),
      get: function (){
        return (new Date() - new Date(this.get('createdAt'))) < 183*24*60*60*1000; //6 meses
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};