require('dotenv').config()
const axios = require("axios");

let urlArray = [];

let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_ACCESS_TOKEN);

module.exports = {
  // try "staffpicks"
  // Queries vimeo list, returns 10 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      client.request(
        /*options*/ {
          path: `/channels/${query}/videos`,
          query: {
            page: 1,
            per_page: 20,
            fields: "uri"
          }
        },
        /*callback*/ function(error, body) {
          if (error) {
            console.log(error);
          } else {
            for (const item of body.data) {
              let vidID = item.uri.split("/").slice(-1)[0];
              axios
                .get(`https://player.vimeo.com/video/${vidID}/config`)
                .then(response => {
                  // console.log(response.data.video.thumbs);
                  response.data.request.files.progressive[0].url &&
                    urlArray.push({
                      type: "vimeo",
                      name: response.data.video.title,
                      smlImg: response.data.video.thumbs["640"],
                      bigImg: response.data.video.thumbs["960"],
                      url: response.data.request.files.progressive[0].url
                    });

                  if (urlArray.length === 20) {
                    // console.log(urlArray);
                    resolve(urlArray);
                  }
                })
                .catch(err => reject(err));
            }
          }
        }
      );
    });
  },

  // try "speed"
  // Queries Vimeo videos by name, returns 10 videos
  searchName: function(query) {
    return new Promise(function(resolve, reject) {
      client.request(
        /*options*/ {
          path: `/videos`,
          query: {
            page: 1,
            per_page: 20,
            query: query,
            sort: "plays",
            fields: "uri"
          }
        },
        /*callback*/ function(error, body) {
          if (error) {
            console.log(error);
          } else {
            for (const item of body.data) {
              let vidID = item.uri.split("/").slice(-1)[0];

              axios
                .get(`https://player.vimeo.com/video/${vidID}/config`)
                .then(response => {
                  // console.log(response.data.video.thumbs);
                  response.data.request.files.progressive[0].url &&
                    urlArray.push({
                      type: "vimeo",
                      name: response.data.video.title,
                      smlImg: response.data.video.thumbs["640"],
                      bigImg: response.data.video.thumbs["960"],
                      url: response.data.request.files.progressive[0].url
                    });

                  if (urlArray.length === 20) {
                    console.log(urlArray);
                    resolve(urlArray);
                  }
                })
                .catch(err => reject(err));
            }
          }
        }
      );
    });
  }
};
