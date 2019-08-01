const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const videos = require("./video");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb://user:password1@ds351107.mlab.com:51107/heroku_qmrhm6sk`,
    { useNewUrlParser: true, useFindAndModify: false }
  )
  .then(() => {
    const steamQ = "popularity";
    const tmdbQ = "popularwishlist";
    const redditQ = "videos";
    const youtubeQ = "mostPopular";
    const vevoQ = "PL9tY0BWXOZFsPMZczEqnyvD-Z5ugOZrm8";
    const vimeoQ = "staffpicks";

    console.log("mongoose connected");
    // videos.addToDb(steamQ, tmdbQ, redditQ, youtubeQ, vevoQ, vimeoQ);
    setInterval(() => {
      console.log("im am a new function");
      // videos.addToDb(steamQ, tmdbQ, redditQ, youtubeQ, vevoQ, vimeoQ);
    }, 60 * 60 * 1000);
  })
  .catch(err => console.log(err));

// Start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
