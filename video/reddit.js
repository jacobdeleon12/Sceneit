const axios = require("axios");

module.exports = {
  // try "videos"
  // Queries Reddit sub, returns 10 videos
  searchList: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(`https://www.reddit.com/r/${query}/hot.json?limit=20`)
        .then(response => {
          for (let obj of response.data.data.children) {
            if (obj.data.domain === "youtube.com") {
              obj.data.url.search("v=") != -1 &&
                urlArray.push({
                  type: "reddit",
                  name: `${obj.data.title.slice(0, 40)}...`,
                  smlImg: obj.data.thumbnail,
                  bigImg: obj.data.media.oembed.thumbnail_url,
                  url: `https://www.youtube.com/embed/${obj.data.url
                    .split("v=")[1]
                    .slice(
                      0,
                      11
                    )}?rel=0;&autoplay=1&mute=0&loop=1&playlist=${obj.data.url
                    .split("v=")[1]
                    .slice(0, 11)}`
                });
            } else if (obj.data.domain === "youtu.be") {
              obj.data.url.search("be/") != -1 &&
                urlArray.push({
                  type: "reddit",
                  name: `${obj.data.title.slice(0, 40)}...`,
                  smlImg: obj.data.thumbnail,
                  bigImg: obj.data.media.oembed.thumbnail_url,
                  url: `https://www.youtube.com/embed/${obj.data.url
                    .split("be/")[1]
                    .slice(
                      0,
                      11
                    )}?rel=0;&autoplay=1&mute=0&loop=1&playlist=${obj.data.url
                    .split("be/")[1]
                    .slice(0, 11)}`
                });
            }
          }
          // console.log(urlArray);
          resolve(urlArray);
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
          `https://www.reddit.com/r/videos/search.json?q=${query}&restrict_sr=on&limit=10&include_over_18=on&sort=relevance&t=all`
        )
        .then(response => {
          let count = 0;

          if (response.data.data.children[0]) {
            for (let obj of response.data.data.children) {
              count++;
              console.log(count);

              if (obj.data.domain === "youtube.com") {
                obj.data.url.search("v=") != -1 &&
                  urlArray.push({
                    type: "reddit",
                    name: `${obj.data.title.slice(0, 40)}...`,
                    smlImg: obj.data.thumbnail,
                    bigImg: obj.data.thumbnail,
                    url: `https://www.youtube.com/embed/${obj.data.url
                      .split("v=")[1]
                      .slice(
                        0,
                        11
                      )}?rel=0;&autoplay=1&mute=0&loop=1&playlist=${obj.data.url
                      .split("v=")[1]
                      .slice(0, 11)}`
                  });
              } else if (obj.data.domain === "youtu.be") {
                obj.data.url.search("be/") != -1 &&
                  urlArray.push({
                    type: "reddit",
                    name: `${obj.data.title.slice(0, 40)}...`,
                    smlImg: obj.data.thumbnail,
                    bigImg: obj.data.thumbnail,
                    url: `https://www.youtube.com/embed/${obj.data.url
                      .split("be/")[1]
                      .slice(
                        0,
                        11
                      )}?rel=0;&autoplay=1&mute=0&loop=1&playlist=${obj.data.url
                      .split("be/")[1]
                      .slice(0, 11)}`
                  });
              }
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
