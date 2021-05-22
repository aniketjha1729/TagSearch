const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  }
});

module.exports = User = mongoose.model("posts", UserSchema);
