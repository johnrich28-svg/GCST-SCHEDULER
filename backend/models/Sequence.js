const mongoose = require("mongoose");

/**
 * Sequence Schema
 * Represents a sequence generator for unique IDs.
 */
const SequenceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

module.exports = mongoose.model("Sequence", SequenceSchema);
