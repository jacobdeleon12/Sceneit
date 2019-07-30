import axios from "axios";

const apiKey = "AIzaSyBJpSy55Bx8rlO3A4FyhWyav8uFtC8_r3I";

let urlArray = [];

export default {
  // try "mostPopular"
  // Queries YouTube playlist, returns 10 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${query}&key=${apiKey}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            obj.snippet.resourceId.videoId &&
              urlArray.push({
                type: obj.snippet.channelTitle,
                name: `${obj.snippet.title.slice(0, 40)}...`,
                smlImg: obj.snippet.thumbnails.medium.url,
                bigImg: obj.snippet.thumbnails.maxres.url,
                url: `https://www.youtube.com/embed/${obj.snippet.resourceId.videoId}`
              });

            if (urlArray.length === 10) {
              console.log(urlArray);
              resolve(urlArray);
            }
          }
        })
        .catch(err => reject(err));
    });
  },

  // try "speed"
  // Queries Youtube channel by name, returns 10 videos
  searchName: function(chan, query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${chan}&maxResults=20&q=${query}&key=${apiKey}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            obj.id.videoId &&
              urlArray.push({
                type: obj.snippet.channelTitle,
                name: `${obj.snippet.title.slice(0, 40)}...`,
                smlImg: obj.snippet.thumbnails.medium.url,
                bigImg: obj.snippet.thumbnails.high.url,
                url: `https://www.youtube.com/embed/${obj.id.videoId}`
              });

            if (urlArray.length === 10) {
              console.log(urlArray);
              resolve(urlArray);
            }
          }
        })
        .catch(err => reject(err));
    });
  }
};
