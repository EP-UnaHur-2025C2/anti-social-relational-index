// repos factory
const engine = (process.env.DB_ENGINE || 'sequelize').toLowerCase();

if (engine === 'sequelize') {
  module.exports = require('./sequelize');
} else if (engine === 'mongo') {
  try {
    module.exports = require('./mongo');
  } catch (err) {
    console.error('DB_ENGINE is set to mongo but repos/mongo is not implemented yet.');
    throw err;
  }
} else {
  throw new Error(`Unsupported DB_ENGINE=${engine}`);
}
