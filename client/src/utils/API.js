import axios from "axios";

export default {
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  // Deletes the user with the given id
  deleteUser: function (_id) {
    return axios.delete("/api/users/" + _id);
  },
  // Saves a video to the user model
  saveVideo: function (id, videoData) {
    return axios.put("/api/users/" + id, videoData);
  },
  // Deletes the video with the given id
  deleteVideo: function (_id, videoData) {
    return axios.put("/api/users/" + _id, videoData);
  },
  // Saves a video to the user model
  searchVideos: function (searchWord) {
    return axios.get("/api/videos/" + searchWord);
  },
  // Saves a video to the user model
  getVideos: function () {
    return axios.get("/api/videos");
  }
};
