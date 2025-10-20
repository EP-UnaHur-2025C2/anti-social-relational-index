// *Entrypoint de la base de datos 
// *Este módulo provee un único punto de importación para la capa de datos de la aplicación.
// *Actualmente re-exporta los modelos existentes de Sequelize (src/db/models).
// *En el futuro podrá cambiar a un adaptador de Mongo cuando process.env.DB_ENGINE === 'mongo'.

const engine = (process.env.DB_ENGINE || 'sequelize').toLowerCase();

if (engine === 'sequelize') {
 
  // *El modelo de sequelize ya está implementado en src/db/models/index.js
  module.exports = require('./models');
} else if (engine === 'mongo') {
  // *En un futuro se podra adapatar a Mongo
  // *Implementar `src/db/mongo.js` (o una carpeta) que exporte la misma estructura que la aplicación espera.
  try {
    module.exports = require('./mongo');
  } catch (err) {
    console.error('DB_ENGINE is set to mongo but ./db/mongo.js is not implemented yet.');
    throw err;
  }
} else {
  throw new Error(`Unsupported DB_ENGINE=${engine}`);
}
