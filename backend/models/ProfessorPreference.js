const mongoose = require("mongoose");

/**
 * Preference Schema
 * Represents professors' subject preferences.
 */
const PreferenceSchema = new mongoose.Schema({
  preference_id: { type: Number, unique: true, required: true }, // preference ID PRIMARY KEY
  professor_id: { type: Number, ref: "Professor", required: true }, // professor ID FOREIGN KEY
  subject_code: { type: String, ref: "Subject", required: true }, // code of the subject FOREIGN KEY
});

module.exports = mongoose.model("ProfessorPreference", PreferenceSchema);
