'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'usuarioId', as: 'posts' });
      User.hasMany(models.Comment, { foreignKey: 'usuarioId', as: 'comentarios' });
      User.belongsToMany(models.User, { through: 'UsuarioSeguidor', as: 'seguidores', foreignKey: 'usuarioId', otherKey: 'seguidorId' });
      User.belongsToMany(models.User, { through: 'UsuarioSeguidor', as: 'seguidos', foreignKey: 'seguidorId', otherKey: 'usuarioId' });
    }
  }
  User.init({
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false 
  });
  return User;
};