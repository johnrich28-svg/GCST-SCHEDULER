const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const { exec } = require("child_process");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Request logging
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

// Function to start the server
const startServer = async () => {
  try {
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

    // Handle server errors
    server.on("error", async (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `⚠️ Port ${PORT} is already in use. Attempting to free up the port...`
        );
        exec(`npx kill-port ${PORT}`, async (execErr) => {
          if (execErr) {
            console.error(
              `❌ Failed to free up port ${PORT}: ${execErr.message}`
            );
            process.exit(1);
          } else {
            console.log(`✅ Port ${PORT} freed up. Restarting server...`);
            await startServer();
          }
        });
      } else {
        console.error(`❌ Server error: ${err.message}`);
      }
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
  }
};

// Start the server
startServer();
