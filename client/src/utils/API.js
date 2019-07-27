import axios from "axios";

require("dotenv").config();

// const tmdbApiKey = process.env.TMDB_API;
const tmdbApiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";

// const steamApiKey = process.env.STEAM_API;
const steamApiKey = "50F40960705A13B52E72106219A2C161";

// const youtubeApiKey = process.env.YOUTUBE_API;
const youtubeApiKey = "AIzaSyBJpSy55Bx8rlO3A4FyhWyav8uFtC8_r3I";

export default {
  // ************** Internal API querys ************** //

  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Deletes the user with the given id
  deleteUser: function(_id) {
    return axios.delete("/api/users/" + _id);
  },
  // Saves a video to the user model
  saveVideo: function(id, videoData) {
    return axios.put("api/users/" + id, videoData);
  },
  // Deletes the video with the given id
  deleteVideo: function(_id, videoData) {
    return axios.put("/api/users/" + _id, videoData);
  },

  // ************** Exsternal API querys ************** //

  // Saves a video to the user model
  saveVideoCode: function(type, videoData) {
    return axios.put("api/Video/" + type, videoData);
  },

  // ***** Reddit API ***** //

  // Reddit hot videos
  redditHot: function() {
    return axios.get("https://www.reddit.com/r/videos/top.json?limit=30");
  },
  // Reddit search by Name
  redditSearchName: function(query) {
    return axios.get(
      `https://www.reddit.com/r/videos/search.json?q=${query}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`
    );
  },

  // ***** YouTube API ***** //

  // Youtube search by Name
  youtubeSearchName: function(query) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=AIzaSyBJpSy55Bx8rlO3A4FyhWyav8uFtC8_r3I`
    );
  },
};
