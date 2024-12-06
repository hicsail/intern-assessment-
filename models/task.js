const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    timestamps: true, // Enable automatic creation of createdAt and updatedAt fields
    tableName: "Tasks", // Explicitly define the table name
  }
);

module.exports = Task;
