const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    req: "VerifiedUser",
  },
  movieName: {
    type: String,
  },
  movieDesc: {
    type: String,
  },
  rating: {
    type: Number,
  },
  moviePic: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
