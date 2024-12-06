require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();
const PORT = process.env.PORT || 3000;
const taskRoutes = require("./routes/tasks");

// Use built-in Express JSON parsing middleware
app.use(express.json());

// Set up the database connection using environment variables
const sequelize = new Sequelize({
  dialect: "sqlite",
  host: process.env.DB_HOST, // Database host from environment variables
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  logging: false, // Disable logging of SQL queries
});

// Function to check if the database connection is successful
async function assertDatabaseConnectionOk() {
  console.log("Checking database connection...");
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log("Database connection OK!"); // Success message if connection works
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

assertDatabaseConnectionOk();

// Define additional models and routes here
app.use("/tasks", taskRoutes); // Updated to /tasks instead of just "/"

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
    console.error("Database connection failed, exiting...");
    process.exit(1); // Exit the application if database connection fails
  });

// Set up the task routes

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ error: "Something went wrong!" }); // Send error response
});
