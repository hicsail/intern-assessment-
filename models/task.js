import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';  // Ensure your database file exports using ES Modules

class Task extends Model {}

Task.init({
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, // Pass the connection instance
  modelName: 'Task', // Name your model
  timestamps: true, // Enable automatic creation of createdAt & updatedAt fields
  tableName: 'Tasks', // Explicitly define the table name
});

export default Task;
