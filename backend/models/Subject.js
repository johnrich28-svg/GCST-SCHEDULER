const mongoose = require("mongoose");

/**
 * Subject Schema
 * Represents academic subjects.
 */
const SubjectSchema = new mongoose.Schema({
  subject_code: { type: String, unique: true, required: true }, // Subject Code
  subject_name: { type: String, required: true }, // Subject Name
  description: { type: String }, // description of subject
  credits: { type: Number, required: true }, // Number of credit units
});

module.exports = mongoose.model("Subject", SubjectSchema);
