const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const movieRouter = require("./routes/api/movies");
const config = require("config");
const app = express();

// Body parser middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
// DB Config
const db = config.get("mongoURI");
// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/", movieRouter);

const port = 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
