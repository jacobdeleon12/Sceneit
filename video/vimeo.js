require("dotenv").config();
const axios = require("axios");

let urlArray = [];

let Vimeo = require("vimeo").Vimeo;
// let client = new Vimeo(
//   process.env.VIMEO_CLIENT_ID,
//   process.env.VIMEO_CLIENT_SECRET,
//   process.env.VIMEO_ACCESS_TOKEN
// );

VIMEO_CLIENT_ID = "385538f9b231338961848e6c1b87ae3cc55b0b69";
VIMEO_CLIENT_SECRET =
  "n6jmUOcKnamF8Z0W3NyCqgkJKdvgTn1nLewYV8MaAKaa8PwwbX3brb/JVh1kkbebHOxnJSb5si/bH3lecfznHcWBlsF9M7COXnxTRQpZJWRG4vtRjRPiP/aVc8hCX6ck";
VIMEO_ACCESS_TOKEN = "4ccb8783bfdab64b76abbf6b2299d5aa";

let client = new Vimeo(
  VIMEO_CLIENT_ID,
  VIMEO_CLIENT_SECRET,
  VIMEO_ACCESS_TOKEN
);

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
            fields: "uri,name,pictures"
          }
        },
        /*callback*/ function(error, body) {
          if (error) {
            console.log(error);
          } else {
            for (const item of body.data) {
              let smlThumb = item.pictures.sizes[3].link;
              let bigThumb = item.pictures.sizes[6].link;
              let vidID = item.uri.split("/").slice(-1)[0];
              let name = item.name;

              item.uri &&
                urlArray.push({
                  type: "vimeo",
                  name: name,
                  smlImg: smlThumb,
                  bigImg: bigThumb,
                  url: `https://player.vimeo.com/video/${vidID}?autoplay=1&color=e4ff00&title=0&byline=0&portrait=0`
                });
            }
            // console.log(urlArray);
            resolve(urlArray);
          }
        }
      );
    });
  },

  // try "speed"
  // Queries Vimeo videos by name, returns 10 videos
  searchName: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      client.request(
        /*options*/ {
          path: `/videos`,
          query: {
            page: 1,
            per_page: 10,
            query: query,
            sort: "plays",
            fields: "uri,name,pictures"
          }
        },
        /*callback*/ function(error, body) {
          if (error) {
            console.log(error);
          } else {
            let count = 0;
            if (body.data[0]) {
              for (const item of body.data) {
                count++;
                console.log(count);

                let smlThumb = item.pictures.sizes[3].link;
                let bigThumb = item.pictures.sizes[6].link;
                let vidID = item.uri.split("/").slice(-1)[0];
                let name = item.name;

                item.uri &&
                  urlArray.push({
                    type: "vimeo",
                    name: name,
                    smlImg: smlThumb,
                    bigImg: bigThumb,
                    url: `https://player.vimeo.com/video/${vidID}?autoplay=1&color=e4ff00&title=0&byline=0&portrait=0`
                  });
              }
              // console.log(urlArray);
              resolve(urlArray);
            } else {
              console.log("found nothing");
              // console.log(urlArray);
              resolve(urlArray);
            }
          }
        }
      );
    });
  }
};
