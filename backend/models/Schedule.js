const mongoose = require("mongoose");

/**
 * Schedule Schema
 * Represents students' enrollment in sections.
 */
const ScheduleSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  }, // Student ID FOREIGN KEY
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  }, // Section ID FOREIGN KEY
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
