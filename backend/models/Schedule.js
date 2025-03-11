const mongoose = require("mongoose");

/**
 * Schedule Schema
 * Represents students' enrollment in sections.
 */
const ScheduleSchema = new mongoose.Schema({
  schedule_id: { type: Number, unique: true, required: true }, // Schedule ID PRIMARY KEY
  student_id: { type: Number, ref: "Student", required: true }, // Student ID FOREIGN KEY
  section_id: { type: Number, ref: "Section", required: true }, // Section ID FOREIGN KEY
});

module.exports = mongoose.model("ScheduleSchema", ScheduleSchema);
