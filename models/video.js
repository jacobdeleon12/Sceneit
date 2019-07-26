const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  youtube: { type: Array, default: [] },
  tmdb: { type: Array, default: [] },
  steam: { type: Array, default: [] },
  reddit: { type: Array, default: [] },
  date: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
