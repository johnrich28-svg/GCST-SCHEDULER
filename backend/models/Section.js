const mongoose = require("mongoose");

/**
 * Section Schema
 * Represents different sections/classes for subjects.
 */
const SectionSchema = new mongoose.Schema({
  section_id: { type: Number, unique: true, required: true }, // Section ID PRIMARY KEY
  section_name: { type: String, required: true }, // Section Name
  schedule_time: { type: String, required: true }, // E.g., "10:00 AM - 11:30 AM"
  schedule_day: { type: String, required: true }, // E.g., "Monday, Wednesday"
  capacity: { type: Number, required: true }, // Room Capacity
  room: { type: String, required: true }, // Name of Room
  subject_code: { type: String, ref: "Subject", required: true }, // Foreign key reference to Subject
  professor_id: { type: Number, ref: "Professor", required: true }, // Foreign key reference to Professor
});

module.exports = mongoose.model("Section", SectionSchema);
