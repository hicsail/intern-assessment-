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
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Exit the application if the connection fails
  }
}

// Call the function to check database connection
assertDatabaseConnectionOk()
  .then(() => {
    // Synchronise models with the database and create tables if they don't exist
    sequelize
      .sync({ alter: true, logging: false })
      .then(() => {
        console.log("Database & tables created!"); // Confirmation message
        // Start the server once the database is set up
        app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`); // Server start message
        });
      })
      .catch((error) => {
        console.error("Failed to synchronise database:", error);
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
