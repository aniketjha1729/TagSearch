const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
