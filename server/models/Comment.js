const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    req: "User",
  },
  comment: {
    type: String,
  },
});

const Comments = mongoose.model("Comments", commentSchema, "Comments");

module.exports = Comments;
