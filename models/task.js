const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Task extends Model {}

Task.init(
  {
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
    // Completed flag is false by default because user cant create already completed task
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize, // Pass the connection instance
    modelName: "Task", // Name your model
    timestamps: true, // Enable automatic creation of createdAt & updatedAt fields
    tableName: "Tasks", // Explicitly define the table name
  },
);

module.exports = Task;
