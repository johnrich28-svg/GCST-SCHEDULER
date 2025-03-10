require("dotenv").config(); // Load env configurations
const mongoose = require("mongoose"); // Import mongoose to connect to MongoDB

// function to connect to the database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // initialize variable to simplified connection
    await mongoose.connect(mongoURI); // URI connection to MongoDB
    console.log("🚀 MongoDB Connected! 🚀");
    return true; // Indicate successful connection
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message} ❌`); // Error message with icon
    return false; // Indicate failed connection
  }
};

module.exports = connectDB;
