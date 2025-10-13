'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      PostImagen.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }
  PostImagen.init({
    url: { type: DataTypes.STRING , unique: true},
  }, {
    sequelize,
    modelName: 'PostImagen',
    timestamps: false
  });
  return PostImagen;
};