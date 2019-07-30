const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the Users below
// ${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}
// user:password1
mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://user:password1@ds351107.mlab.com:51107/heroku_qmrhm6sk`,
  { useNewUrlParser: true }
);

const videoSeed = [
  {
    vidType: "tmdb",
    videos: [],
    date: new Date(Date.now())
  },
  {
    vidType: "steam",
    videos: [],
    date: new Date(Date.now())
  },
  {
    vidType: "youtube",
    videos: [],
    date: new Date(Date.now())
  },
  {
    vidType: "reddit",
    videos: [],
    date: new Date(Date.now())
  }
];

db.Video.deleteMany({})
  .then(() => db.Video.collection.insertMany(videoSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
