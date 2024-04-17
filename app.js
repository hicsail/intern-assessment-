import express from 'express';
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

// Retrievingthe port number from environment variables or use 3000 as a default
const PORT = process.env.PORT || 3000;

// Starting the server on the specified port and log a message to the console upon successful startup
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
