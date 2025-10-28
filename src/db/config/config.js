require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "red_anti_social",
    host: "data/db.sqlite",
    dialect: "sqlite"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: 5432,
    logging: false
  }
};
