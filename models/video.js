const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  type: String,
  videos: { type: Array, default: [] },
  date: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
