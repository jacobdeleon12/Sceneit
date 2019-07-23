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

const userSeed = [
  {
    email: "stealymonk@gmail.com",
    familyName: "Richardson",
    givenName: "Kai",
    googleId: "106273713002496362502",
    imageUrl:
    "https://lh6.googleusercontent.com/-jyLtxEGfgLU/AAAAAAAAAAI/AAAAAAAAAMo/y_usrbjOAXI/s96-c/photo.jpg",
    name: "Kai",
    savedVideos: [
      // Youtube video
      {
        name: "Antique Hand Cranked Grinder - Restoration",
        url: "https://www.youtube.com/embed/pqKyLvjgM1M",
        comments: [
          {
            name: "Keanu Reeves",
            comment: "Whoa.."
          }
        ],
        date: "2019-07-20 00:37:36.466Z"
      },
      // Vimeo video
      {
        name: "Funny Cats - Funny vines - Funny Video - Funny Animals Videos",
        url: "https://player.vimeo.com/video/116046838",
        comments: [
          {
            name: "Robert De Niro",
            comment: "You think this is funny!?"
          }
        ],
        date: "2019-10-05 00:37:36.466Z"
      },
      // Steam video
      {
        name: "Cyberpunk 2077",
        url:
          "https://steamcdn-a.akamaihd.net/steam/apps/256753426/movie_max.webm?t=1560520757",
          comments: [
            {
              name: "Denzel Washington",
              comment: "My man!"
            }
          ],  
        date: "2019-04-20 00:37:36.466Z"
      }
    ],
    date: new Date(Date.now())
  }
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
