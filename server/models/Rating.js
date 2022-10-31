const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    req: "Movie",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    req: "VerifiedUser",
  },
  rating: {
    type: Number,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
