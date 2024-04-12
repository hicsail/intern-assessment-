require("dotenv").config();
const express = require("express");
// const sequelize = require("./models/todo");
const sequelize = require("./database");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const taskRoutes = require("./routes/tasks");

app.use(express.static("public"));
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
app.use("/", taskRoutes);

// Synchronize models with the database
sequelize
  .sync({ alter: true, logging: false })
  .then(() => {
    console.log("Database & tables created!");
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/public/index.html");
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
