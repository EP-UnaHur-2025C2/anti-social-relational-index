'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Post, { foreignKey: 'usuarioId', as: 'posts' });
      Usuario.hasMany(models.Comentario, { foreignKey: 'usuarioId', as: 'comentarios' });
      Usuario.belongsToMany(models.Usuario, { through: 'UsuarioSeguidor', as: 'seguidores', foreignKey: 'usuarioId', otherKey: 'seguidorId' });
      Usuario.belongsToMany(models.Usuario, { through: 'UsuarioSeguidor', as: 'seguidos', foreignKey: 'seguidorId', otherKey: 'usuarioId' });
    }
  }
  Usuario.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false //Puede llegar a ser útil
  });
  return Usuario;
};