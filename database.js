import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE_PATH, // Ensure your .env file defines DB_FILE_PATH
});

export default sequelize;
