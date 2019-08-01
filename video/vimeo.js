const axios = require("axios");

let urlArray = [];

let CLIENT_ID = "385538f9b231338961848e6c1b87ae3cc55b0b69";
let CLIENT_SECRET =
  "n6jmUOcKnamF8Z0W3NyCqgkJKdvgTn1nLewYV8MaAKaa8PwwbX3brb/JVh1kkbebHOxnJSb5si/bH3lecfznHcWBlsF9M7COXnxTRQpZJWRG4vtRjRPiP/aVc8hCX6ck";
let ACCESS_TOKEN = "e126558674c8aef099b8e5dd989f3b83";

let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

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
  // Queries Youtube by name, returns 10 videos
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
