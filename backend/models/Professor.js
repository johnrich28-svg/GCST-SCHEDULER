const mongoose = require("mongoose");

/**
 * Professor Schema
 * Represents professors who teach subjects.
 */
const ProfessorSchema = new mongoose.Schema({
  professor_id: { type: Number, unique: true, required: true }, // professor ID PRIMARY KEY
  name: { type: String, required: true }, // professor name
  email: { type: String, required: true }, // professor email
  status: { type: String, required: true }, // Active/Inactive
  password: { type: String, required: true }, // Hashed password
});

module.exports = mongoose.model("Professor", ProfessorSchema); // exporting
