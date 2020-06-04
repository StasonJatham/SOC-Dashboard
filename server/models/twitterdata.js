const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TwitterDataSchema = new Schema({
  created_at: Date,
  username: String,
  id: { type: Number, unique: true },
  full_text: String,
  source: String,
});

module.exports = mongoose.model("TwitterData", TwitterDataSchema);
