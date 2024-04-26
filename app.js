require("dotenv").config();
const express = require("express");
const sequelize = require("./database"); // Update this line
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Route imports
const getAllTasksRouter = require("./routes/getAllTasks");
const getAllCompletedTasksRouter = require("./routes/getAllCompletedTasks");
const getAllPendingTasksRouter = require("./routes/getAllPendingTasks");
const getTaskRouter = require("./routes/getTask");
const createTaskRouter = require("./routes/createTask");
const deleteTaskRouter = require("./routes/deleteTask");
const completeTaskRouter = require("./routes/completeTask");
const updateTaskTitleRouter = require("./routes/updateTaskTitle");

app.use(bodyParser.json());

// Check DB connection
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

assertDatabaseConnectionOk();

// Define additional models and routes here
app.use("/getAllTasks", getAllTasksRouter);
app.use("/createTask", createTaskRouter);
app.use("/deleteTask", deleteTaskRouter);
app.use("/completeTask", completeTaskRouter);
app.use("/getAllCompletedTasks", getAllCompletedTasksRouter);
app.use("/getAllPendingTasks", getAllPendingTasksRouter);
app.use("/getTask", getTaskRouter);
app.use("/updateTaskTitle", updateTaskTitleRouter);

// Synchronize models with the database
sequelize
  .sync({ alter: true, logging: false })
  .then(() => {
    console.log("Database & tables created!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
