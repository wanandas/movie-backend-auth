const express = require("express");
const Router = express.Router();

const Movie = require("../../models/Movie");
const auth = require("../../middleware/auth");

//get Movie
Router.get("/movie/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
      status: "success",
      movie,
    });
  } catch (err) {
    console.error(err);
  }
});

Router.get("/movies", auth, async (req, res) => {
  try {
    const allMovie = await Movie.find({}, { __v: 0 });

    res.status(200).json({
      status: "success",
      movies: allMovie,
    });
  } catch (err) {
    console.error(err);
  }
});

Router.post("/movies", auth, async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    yearReleased: req.body.yearReleased,
    rating: req.body.rating,
  });

  await Movie.create(newMovie);

  res.status(201).json({
    status: "success",
    movie: newMovie,
  });
});

Router.patch("/movie/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError("No movie found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    movie,
  });
});

Router.delete("/movie/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError("No movie found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    movie: null,
  });
});

module.exports = Router;
