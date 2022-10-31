const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    req: "VerifiedUser",
  },
  comment: {
    type: String,
  },
});

const Comments = mongoose.model("Comments", commentSchema, "Comments");

module.exports = Comments;
