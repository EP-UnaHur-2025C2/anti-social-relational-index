// Central DB entrypoint
// This module provides a single import point for the application's data layer.
// Right now it re-exports the existing Sequelize models (src/db/models).
// In the future it can switch to a Mongo adapter when process.env.DB_ENGINE === 'mongo'.

const engine = (process.env.DB_ENGINE || 'sequelize').toLowerCase();

if (engine === 'sequelize') {
  // The existing models index initializes Sequelize and returns all models + sequelize
  module.exports = require('./models');
} else if (engine === 'mongo') {
  // Placeholder for a future Mongo adapter implementation.
  // Implement `src/db/mongo.js` (or a folder) that exports the same shape the app expects.
  try {
    module.exports = require('./mongo');
  } catch (err) {
    console.error('DB_ENGINE is set to mongo but ./db/mongo.js is not implemented yet.');
    throw err;
  }
} else {
  throw new Error(`Unsupported DB_ENGINE=${engine}`);
}
