const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  vidType: String,
  videos: Object,
  date: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
