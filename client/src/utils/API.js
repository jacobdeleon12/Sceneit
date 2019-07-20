import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  //Reddit Api Hot
  getVideos: function(){
    return axios.get("https://www.reddit.com/r/videos/top.json?limit=30");
  },
  // Youtube api search
  searchYoutube: function(query) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=AIzaSyBJpSy55Bx8rlO3A4FyhWyav8uFtC8_r3I`);
  },
 
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  }
};



