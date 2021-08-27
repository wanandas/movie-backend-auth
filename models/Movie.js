const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  yearReleased: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
