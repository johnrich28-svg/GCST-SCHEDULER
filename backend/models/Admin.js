const mongoose = require("mongoose");

/**
 * Admin Schema
 * Represents system administrators with role-based access.
 */
const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // Admin username
    password: { type: String, required: true }, // Hashed password
    name: { type: String, required: true }, // Admin full name
    email: { type: String, required: true, unique: true }, // Admin email
    status: { type: String, enum: ["active", "inactive"], required: true }, // Account status
    role: { type: String, enum: ["super_admin", "admin"], required: true }, // Role type
  },
  { timestamps: true }
); // Add timestamps

// Fix the export statement
module.exports = mongoose.model("Admin", AdminSchema);
