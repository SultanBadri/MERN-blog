const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  // imageUrl: { type: String, required: false },
});

module.exports = mongoose.model("Post", PostSchema);
