const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Import environment variables from .env
const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not provided in .env
const taskRoutes = require("./routes/tasks");

// Use built-in Express JSON parsing middleware to handle request bodies
app.use(express.json());

// Set up the database connection using environment variables from .env
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_FILE_PATH,  // This should point to the SQLite database file path
  logging: false, // Disable logging of SQL queries
});

// Function to check if the database connection is successful
async function assertDatabaseConnectionOk() {
  console.log("Checking database connection...");
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Exit if the connection fails
  }
}

// Check the database connection as the app starts
assertDatabaseConnectionOk();

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Task API!"); // Simple welcome message
});

// Use task routes for any `/tasks` related requests
app.use("/tasks", taskRoutes);

// Synchronize models with the database, creating tables if needed
sequelize.sync({ alter: true, logging: false }).then(() => {
  console.log("Database & tables created!");

  // Start the Express server after DB sync
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed, exiting...");
  process.exit(1); // Exit if the DB sync fails
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ error: "Something went wrong!" }); // Send a generic error response
});
