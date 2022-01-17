const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: String, maxlength: 25, required: true },
  text: { type: String, required: true },
  postId: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Comment", CommentSchema);
