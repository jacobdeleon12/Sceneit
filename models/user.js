const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  savedVideos: [],
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
