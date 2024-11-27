/* Author: Jaideep Singh, 11/26/2024 */

require("dotenv").config();
const express = require("express");
const sequelize = require("./database"); // Your database connection
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Import task routes
const taskRoutes = require("./routes/tasks");

// Middleware for parsing JSON
app.use(bodyParser.json());

// Root route (to avoid "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Welcome to the Task Management API!");
});

// Check the database connection on startup
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1); // Exit if database connection fails
  }
}

// Check connection and sync database
async function startServer() {
  try {
    await assertDatabaseConnectionOk();

    // Sync database once (no need to call it twice)
    await sequelize.sync({ alter: true }); // This will create or update the database structure
    console.log("Database & tables created!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
}

startServer();

// Define routes from taskRoutes
app.use("/tasks", taskRoutes); // Assuming taskRoutes is under /tasks
