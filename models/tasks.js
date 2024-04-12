const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Tasks extends Model {}

Tasks.init(
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
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: "Tasks", // Name your model
    timestamps: true, // Enable automatic creation of createdAt & updatedAt fields
    tableName: "Tasks", // Explicitly define the table name
  }
);

module.exports = Tasks;
