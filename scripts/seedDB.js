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
    googleId: "106273713002496362502",
    givenName: "Kai",
    familyName: "Richardson",
    email: "stealymonk@gmail.com",
    imageUrl:
      "https://lh6.googleusercontent.com/-jyLtxEGfgLU/AAAAAAAAAAI/AAAAAAAAAMo/y_usrbjOAXI/s96-c/photo.jpg",
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
