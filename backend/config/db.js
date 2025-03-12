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
    const existingSuperAdmin = await Admin.findOne({ role: "super_admin" });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash("superadmin123", 10);

      await Admin.create({
        username: "superadmin",
        password: hashedPassword,
        name: "Super Admin",
        email: "superadmin@example.com",
        status: "active",
        role: "super_admin",
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
