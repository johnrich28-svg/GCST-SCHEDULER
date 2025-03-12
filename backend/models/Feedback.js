const mongoose = require("mongoose");

/**
 * Feedback Schema
 * Represents student feedback on courses or professors.
 */
const FeedbackSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  }, // student ID to track student who write the feedback
  feedback_text: { type: String, required: true }, // the feedback of student
  feedback_date: { type: Date, default: Date.now }, // date of the student feedback
});

module.exports = mongoose.model("Feedback", FeedbackSchema); // exporting to be used
