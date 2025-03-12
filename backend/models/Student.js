const mongoose = require("mongoose");

/**
 * Student Schema
 * Represents students with course and enrollment details.
 */
const StudentSchema = new mongoose.Schema(
  {
    student_number: { type: String, unique: true, required: true }, // University assigned number
    name: { type: String, required: true }, // Student Name
    course: { type: String, required: true }, // Course name (e.g., BS Computer Science)
    year_level: { type: Number, required: true, min: 1, max: 4 }, // 1, 2, 3, 4
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    }, // Active/Inactive
    student_type: {
      type: String,
      required: true,
      enum: ["regular", "irregular"],
      default: "regular",
    }, // Regular/Irregular
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email with validation
    password: { type: String, required: true }, // Hashed password
  },
  { timestamps: true }
); // Add timestamps

module.exports = mongoose.model("Student", StudentSchema);
