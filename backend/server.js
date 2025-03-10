require("dotenv").config(); // Load env configurations
const express = require("express"); // Import express to create server
const cors = require("cors"); // Import cors to enable CORS
const connectDB = require("./config/db"); // Import connectDB function to connect to MongoDB

const app = express();
const port = process.env.PORT || 3000; // PORT to run the server

// Function to start the server
async function startServer() {
  try {
    const isDbConnected = await connectDB(); // Connect to MongoDB
    if (isDbConnected) {
      // Check if database connection was successful.
      app.use(cors()); // Enable CORS
      app.use(express.json()); // Parse JSON bodies

      app.listen(port, () => {
        console.log(
          `🚀 MongoDB Connected! 🚀\n👂 Server listening at http://localhost:${port} 👂`
        );
      });
    } else {
      console.log(`❌ MongoDB Connection Failed! ❌\nServer startup aborted.`);
    }
  } catch (error) {
    console.error(`🔥 Server startup error: ${error} 🔥`);
  }
}

startServer(); // Start the server
