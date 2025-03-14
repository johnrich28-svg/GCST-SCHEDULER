const mongoose = require("mongoose");

/**
 * Admin Schema
 * Represents system administrators with role-based access.
 */
const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // Admin email
    password: { type: String, required: true }, // Hashed password
    name: { type: String, required: true }, // Admin full name
    role: { type: String, enum: ["admin"], required: true }, // Role type
    address: { type: String, required: true }, // Home
    contact_number: { type: String, required: true }, // Contact number
    birthdate: { type: Date, required: true }, // Birthdate*
  },
  { timestamps: true }
); // Add timestamps

module.exports = mongoose.model("Admin", AdminSchema);
