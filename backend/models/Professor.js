const mongoose = require("mongoose");

/**
 * Professor Schema
 * Represents professors who teach subjects.
 */
const ProfessorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Professor name
  email: { type: String, required: true, unique: true }, // Professor email
  status: { type: String, required: true, enum: ["active", "inactive"] }, // Active/Inactive
  password: { type: String, required: true }, // Hashed password
  contact_number: { type: String, required: true }, // Contact number
  department: { type: String, required: true }, // Department
  office_hours: { type: String, required: true }, // Office hours
});

module.exports = mongoose.model("Professor", ProfessorSchema); // Exporting
