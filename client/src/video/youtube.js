import axios from "axios";

const apiKey = "AIzaSyBJpSy55Bx8rlO3A4FyhWyav8uFtC8_r3I";

export default {
  // try "mostPopular"
  // Queries YouTube list, returns 10 videos
  searchList: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=${query}&maxResults=10&regionCode=US&key=${apiKey}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            obj.id &&
              urlArray.push({
                type: "youtube",
                name: `${obj.snippet.title.slice(0, 40)}...`,
                url: `https://www.youtube.com/embed/${obj.id}`
              });

            if (urlArray.length === 10) {
              // console.log(urlArray);
              resolve(urlArray);
            }
          }
        })
        .catch(err => reject(err));
    });
  },

  // try "videos"
  // Queries Reddit name, returns 10 videos
  searchName: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`
        )
        .then(response => {
          for (let obj of response.data.items) {
            // console.log(obj.id);
            
            obj.id &&
              urlArray.push({
                type: "youtube",
                name: `${obj.snippet.title.slice(0, 40)}...`,
                url: `https://www.youtube.com/embed/${obj.id.videoId}`
              });

            if (urlArray.length === 10) {
              // console.log(urlArray);
              resolve(urlArray);
            }
          }
        })
        .catch(err => reject(err));
    });
  }
};
