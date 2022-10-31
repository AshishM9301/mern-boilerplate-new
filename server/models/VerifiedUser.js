const mongoose = require("mongoose");

const verifiedUserSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  userPic: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Viewer", "Writer", "Admin"],
    default: "Viewer",
  },
  token: {
    type: String,
    default: "",
  },
  tokenexp: {
    type: String,
  },
});

const VerifiedUser = mongoose.model("VerifiedUser", verifiedUserSchema);

module.exports = VerifiedUser;
