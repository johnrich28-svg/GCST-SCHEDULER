const mongoose = require("mongoose");

/**
 * Student Schema
 * Represents students with course and enrollment details.
 */
const StudentSchema = new mongoose.Schema({
  student_id: { type: Number, unique: true, required: true },
  student_number: { type: String, unique: true, required: true }, // University assigned number
  name: { type: String, required: true }, // Student Name
  course: { type: String, required: true }, // Course name (e.g., BS Computer Science)
  year_level: { type: Number, required: true }, // 1, 2, 3, 4
  status: { type: String, required: true }, // Active/Inactive
  email: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
});

module.exports = mongoose.model("Student", StudentSchema);
