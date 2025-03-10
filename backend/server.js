require("dotenv").config(); // Load environment configurations from .env file
const express = require("express"); // Import express to create the server application
const cors = require("cors"); // Import cors to enable Cross-Origin Resource Sharing
const connectDB = require("./config/db"); // Import the connectDB function to establish MongoDB connection

const app = express();
const port = process.env.PORT || 3000; // Define the port for the server, using environment variable or default to 3000

// Function to start the server
async function startServer() {
  try {
    await connectDB(); // Attempt to connect to MongoDB, handled with error handling in db.js
    app.use(cors()); // Enable CORS middleware to allow cross-origin requests
    app.use(express.json()); // Enable JSON parsing middleware to parse incoming JSON request bodies

    app.listen(port, () => {
      console.log(`👂 Server listening at http://localhost:${port} 👂`); // Log successful server start
    });
  } catch (error) {
    console.error(`🔥 Server startup error: ${error} 🔥`); // Log server startup errors
  }
}

startServer(); // Start the server application
