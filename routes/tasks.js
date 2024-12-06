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
    
  },
  {
    sequelize,
    modelName: "Task",
    timestamps: true,
    tableName: "Tasks",
  }
);

module.exports = Task;
