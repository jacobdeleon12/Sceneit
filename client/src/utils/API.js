import axios from "axios";

export default {
  // *** Internal API querys ***

  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function (_id) {
    return axios.delete("/api/users/" + _id);
  },
  //Reddit Api Hot
  getRedditHot: function () {
    return axios.get("https://www.reddit.com/r/videos/top.json?limit=30");
  },
  //reddit search
  getRedditSearch: function (query) {
    return axios.get(
      `https://www.reddit.com/r/videos/search.json?q=${query}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`
    );
  },
  // Youtube api search
  getYoutubeSearch: function (query) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=AIzaSyBJpSy55Bx8rlO3A4FyhWyav8uFtC8_r3I`
    );
  },
  // the movie base Video for youtube
  getTmdbVideos: function (query) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${query}/videos?api_key=7b07c1ac2c9e9a9f62cfc49a4ec55f99&language=en-US`
    );
  },
  //TMDB popular for default landing 
  getMoviePop: function () {
    return axios.get("https://api.themoviedb.org/3/movie/popular?api_key=7b07c1ac2c9e9a9f62cfc49a4ec55f99&language=en-US&page=1")
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  // Saves a video to the user model
  saveVideo: function (id, videoData) {
    return axios.put("/api/users/" + id, videoData)
  },
  // Deletes the video with the given id
  deleteVideo: function (_id, videoData) {
    return axios.put("/api/users/" + _id, videoData);
  },
  //the movie base API
  getTmdbInfo: function (query) {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=7b07c1ac2c9e9a9f62cfc49a4ec55f99&query=${query}`
    );
  },
  // Steam api all
  getAllSteam: function (query) {
    return axios.get(`https://api.steampowered.com/ISteamApps/GetAppList/v1/`);
  }
};
