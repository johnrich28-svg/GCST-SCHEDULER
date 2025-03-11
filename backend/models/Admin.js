const mongoose = require("mongoose");

/**
 * Admin Schema
 * Represents system administrators with role-based access.
 */
const AdminSchema = new mongoose.Schema({
  admin_id: { type: Number, unique: true, required: true }, // Unique admin ID
  username: { type: String, required: true }, // Admin username
  password: { type: String, required: true }, // Hashed password
  name: { type: String, required: true }, // Admin full name
  email: { type: String, required: true }, // Admin email
  status: { type: String, required: true }, // Account status (active/inactive)
  role: {
    type: String,
    enum: ["super_admin", "admin"],
    required: true,
  }, // Role to distinguish Super Admin and Admin
});

module.export = mongoose.model("Admin", AdminSchema);
