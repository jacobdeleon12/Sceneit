import axios from "axios";

export default {
  // try "videos"
  // Queries Reddit sub, returns 10 videos
  searchList: function(query) {
    let urlArray = [];
    let YtCode = "";
    let YtTitle = "";

    axios
      .get(`https://www.reddit.com/r/${query}/top.json?limit=30`)
      .then(response => {

        for (let obj of response.data.data.children) {
          if (obj.data.domain === "youtube.com") {
            YtCode = obj.data.url.split("v=")[1].slice(0, 11);
            YtTitle = obj.data.title;
          } else if (obj.data.domain === "youtu.be") {
            YtCode = obj.data.url.split("be/")[1].slice(0, 11);
            YtTitle = obj.data.title;
          }

          YtCode &&
            urlArray.push({
              name: YtTitle,
              url: `https://www.youtube.com/embed/${YtCode}`
            });

          if (urlArray.length === 10) {
            console.log(urlArray);
            return urlArray;
          }
        }
      })
      .catch(err => console.log(err));
  },

    // try "videos"
  // Queries Reddit name, returns 10 videos
  searchName: function(query) {
    let urlArray = [];
    let YtCode = "";
    let YtTitle = "";

    axios
      .get(`https://www.reddit.com/r/videos/search.json?q=${query}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`)
      .then(response => {
        const redditdata = response.data.data.children;

        for (let obj of redditdata) {
          if (obj.data.domain === "youtube.com") {
            YtCode = obj.data.url.split("v=")[1].slice(0, 11);
            YtTitle = obj.data.title;
          } else if (obj.data.domain === "youtu.be") {
            YtCode = obj.data.url.split("be/")[1].slice(0, 11);
            YtTitle = obj.data.title;
          }

          YtCode &&
            urlArray.push({
              name: YtTitle,
              url: `https://www.youtube.com/embed/${YtCode}`
            });

          if (urlArray.length === 10) {
            console.log(urlArray);
            return urlArray;
          }
        }
      })
      .catch(err => console.log(err));
  }
};
