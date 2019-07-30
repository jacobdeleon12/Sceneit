import axios from "axios";

let urlArray = [];

export default {
  // try "videos"
  // Queries Reddit sub, returns 10 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(`https://www.reddit.com/r/${query}/hot.json?limit=30`)
        .then(response => {
          // console.log(response.data.data.children);
          for (let obj of response.data.data.children) {
            
            if (obj.data.domain === "youtube.com") {
              obj.data.url &&
                urlArray.push({
                  type: "reddit",
                  name: `${obj.data.title.slice(0, 40)}...`,
                  smlImg: obj.data.thumbnail,
                  bigImg: obj.data.media.oembed.thumbnail_url,
                  url: `https://www.youtube.com/embed/${obj.data.url
                    .split("v=")[1]
                    .slice(0, 11)}`
                });
            } else if (obj.data.domain === "youtu.be") {
              obj.data.url &&
                urlArray.push({
                  type: "reddit",
                  name: `${obj.data.title.slice(0, 40)}...`,
                  smlImg: obj.data.thumbnail,
                  bigImg: obj.data.media.oembed.thumbnail_url,
                  url: `https://www.youtube.com/embed/${obj.data.url
                    .split("be/")[1]
                    .slice(0, 11)}`
                });
            }

            if (urlArray.length === 10) {
              console.log(urlArray);
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
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://www.reddit.com/r/videos/search.json?q=${query}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`
        )
        .then(response => {
          for (let obj of response.data.data.children) {
            if (obj.data.domain === "youtube.com") {
              obj.data.url &&
                urlArray.push({
                  type: "reddit",
                  name: `${obj.data.title.slice(0, 40)}...`,
                  smlImg: obj.data.thumbnail,
                  bigImg: obj.data.media.oembed.thumbnail_url,
                  url: `https://www.youtube.com/embed/${obj.data.url
                    .split("v=")[1]
                    .slice(0, 11)}`
                });
            } else if (obj.data.domain === "youtu.be") {
              obj.data.url &&
                urlArray.push({
                  type: "reddit",
                  name: `${obj.data.title.slice(0, 40)}...`,
                  smlImg: obj.data.thumbnail,
                  bigImg: obj.data.media.oembed.thumbnail_url,
                  url: `https://www.youtube.com/embed/${obj.data.url
                    .split("be/")[1]
                    .slice(0, 11)}`
                });
            }

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