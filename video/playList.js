require("dotenv").config();
const axios = require("axios");

YOUTUBE_API = "AIzaSyBQaJOdXS5rojwu9fVmBi-JenkMGVMUIec";

module.exports = {
  // try "mostPopular"
  // Queries YouTube playlist, returns 10 videos
  searchPlayList: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${query}&key=${YOUTUBE_API}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            obj.snippet.resourceId.videoId &&
              urlArray.push({
                type: obj.snippet.channelTitle,
                name: `${obj.snippet.title.slice(0, 40)}...`,
                smlImg: obj.snippet.thumbnails.medium.url,
                bigImg: obj.snippet.thumbnails.maxres.url,
                url: `https://www.youtube.com/embed/${obj.snippet.resourceId.videoId}?rel=0;&autoplay=1&mute=0&loop=1`
              });
          }
          // console.log(urlArray);
          resolve(urlArray);
        })
        .catch(err => reject(err));
    });
  },

  // try "speed"
  // Queries Youtube channel by name, returns 10 videos
  searchChannel: function(channelId, query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      let count = 0;

      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&q=${query}&key=${YOUTUBE_API}`
        )
        .then(response => {
          if (response.data.items[0]) {
            for (let obj of response.data.items) {
              count++;
              console.log(count);

              obj.id.videoId &&
                urlArray.push({
                  type: obj.snippet.channelTitle,
                  name: `${obj.snippet.title.slice(0, 40)}...`,
                  smlImg: obj.snippet.thumbnails.medium.url,
                  bigImg: obj.snippet.thumbnails.high.url,
                  url: `https://www.youtube.com/embed/${obj.id.videoId}?rel=0;&autoplay=1&mute=0&loop=1`
                });
            }
            // console.log(urlArray);
            resolve(urlArray);
          } else {
            console.log("found nothing");
            // console.log(urlArray);
            resolve(urlArray);
          }
        })
        .catch(err => reject(err));
    });
  }
};
