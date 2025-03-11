const mongoose = require("mongoose");

/**
 * Feedback Schema
 * Represents student feedback on courses or professors.
 */
const FeedbackSchema = new mongoose.Schema({
  feedback_id: { type: Number, unique: true, required: true }, // feedback ID
  student_id: { type: Number, ref: "Student", required: true }, // student ID to track student who write the feedback
  feedback_text: { type: String, required: true }, // the feedbackk of student
  feedback_date: { type: Date, default: Date.now }, // date of the student feedback
});

module.exports = mongoose.model("FeedbackSchema", FeedbackSchema); // exporting to be used
