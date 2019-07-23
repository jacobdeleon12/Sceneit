const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  familyName: { type: String, required: true },
  givenName: { type: String, required: true },
  googleId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  savedVideos: Object,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
