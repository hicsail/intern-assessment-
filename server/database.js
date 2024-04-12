const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_FILE_PATH, // Ensure your .env file defines DB_FILE_PATH
});

module.exports = sequelize;
