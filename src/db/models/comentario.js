'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comentario.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
      Comentario.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });  
    }
  }
  Comentario.init({
    texto: DataTypes.STRING,
    visible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};