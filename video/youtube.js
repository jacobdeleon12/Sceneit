require("dotenv").config();
const axios = require("axios");

YOUTUBE_API = "AIzaSyBQaJOdXS5rojwu9fVmBi-JenkMGVMUIec";
let urlArray = [];

module.exports = {
  // try "mostPopular"
  // Queries YouTube list, returns 10 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=${query}&maxResults=10&regionCode=US&key=${YOUTUBE_API}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            obj.id &&
              urlArray.push({
                type: "youtube",
                name: `${obj.snippet.title.slice(0, 40)}...`,
                smlImg: obj.snippet.thumbnails.medium.url,
                bigImg: obj.snippet.thumbnails.high.url,
                url: `https://www.youtube.com/embed/${obj.id}?rel=0;&autoplay=1&mute=0&loop=1&playlist=${obj.id}`
              });
          }
          // console.log(urlArray);
          resolve(urlArray);
        })
        .catch(err => reject(err));
    });
  },

  // try "speed"
  // Queries Youtube by name, returns 10 videos
  searchName: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&regionCode=US&key=${YOUTUBE_API}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            obj.id &&
              urlArray.push({
                type: "youtube",
                name: `${obj.snippet.title.slice(0, 40)}...`,
                smlImg: obj.snippet.thumbnails.medium.url,
                bigImg: obj.snippet.thumbnails.high.url,
                url: `https://www.youtube.com/embed/${obj.id}?rel=0;&autoplay=1&mute=0&loop=1&playlist=${obj.id}`
              });
          }
          // console.log(urlArray);
          resolve(urlArray);
        })
        .catch(err => reject(err));
    });
  }
};
