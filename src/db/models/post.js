'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
      Post.hasMany(models.Comentario, { foreignKey: 'postId', as: 'comentarios' });
      Post.hasMany(models.PostImagen, { foreignKey: 'postId', as: 'imagenes' });//Revisar el nombre del modelo
      Post.belongsToMany(models.Tag, { through: 'PostTag', foreignKey: 'postId', as: 'tags',timestamps: false });//Revisar el nombre del modelo
    }
  }
  Post.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};