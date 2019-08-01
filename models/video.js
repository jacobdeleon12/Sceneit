const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  vidType: String,
  videos: Array,
  date: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
