require("dotenv").config();
const axios = require("axios");

YOUTUBE_API = "AIzaSyBQaJOdXS5rojwu9fVmBi-JenkMGVMUIec";

module.exports = {
  // try "mostPopular"
  // Queries YouTube list, returns 10 videos
  searchList: function(query) {
    let urlArray = [];
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
                bigImg: obj.snippet.thumbnails.medium.url,
                url: `https://www.youtube.com/embed/${obj.id}?rel=0;&autoplay=1`
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
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      let count = 0;

      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&regionCode=US&key=${YOUTUBE_API}`
        )
        .then(response => {
          if (response.data.items[0]) {
            for (let obj of response.data.items) {
              count++;
              console.log(count);

              obj.id &&
                urlArray.push({
                  type: "youtube",
                  name: `${obj.snippet.title.slice(0, 40)}...`,
                  smlImg: obj.snippet.thumbnails.medium.url,
                  bigImg: obj.snippet.thumbnails.medium.url,
                  url: `https://www.youtube.com/embed/${obj.id}?rel=0;&autoplay=1`
                });
            }
            // console.log(urlArray);
            resolve(urlArray);
          } else {
            console.log("found nothing");
            resolve(urlArray);
          }
        })
        .catch(err => reject(err));
    });
  }
};
