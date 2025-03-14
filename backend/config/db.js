require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

/**
 * Connects to MongoDB and creates a built-in Super Admin if not exists.
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🚀 MongoDB Connected! 🚀");

    // Check if a Super Admin already exists
    const existingAdmin = await Admin.findOne({ role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await Admin.create({
        password: hashedPassword,
        name: "Admin",
        birthdate: "2004-10-28",
        email: "admin@example.com",
        contact_number: "09674659165",
        address: "Manila, Philippines",
        status: "active",
        role: "admin",
      });

      console.log(
        "🔹 Super Admin created (username: superadmin, password: superadmin123)"
      );
    }
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message} ❌`);
  }
};

module.exports = connectDB;
