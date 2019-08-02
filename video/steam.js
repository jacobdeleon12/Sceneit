const cheerio = require("cheerio");
const axios = require("axios");

let urlArray = [];
let count = 0;

module.exports = {
  // try "popularwishlist"
  // Scrapes list page, returns 10 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://store.steampowered.com//search/?category1=998&os=win&filter=${query}`
        )
        .then(response => {
          let $ = cheerio.load(response.data);

          $("a.search_result_row").each((i, element) => {
            let urlLink = $(element).attr("href");
            axios
              .get(urlLink)
              .then(response => {
                count++;
                let $ = cheerio.load(response.data);

                $("div.highlight_movie").attr("data-webm-hd-source") &&
                  urlArray.push({
                    type: "steam",
                    name: $("div.apphub_AppName").text(),
                    smlImg: $("img.movie_thumb").attr("src"),
                    bigImg: $("img.game_header_image_full").attr("src"),
                    url: $("div.highlight_movie").attr("data-webm-hd-source")
                  });
              })
              .catch(err => reject(err));
            // console.log(urlArray);
            resolve(urlArray);
          });
        })
        .catch(err => reject(err));
    });
  },

  // Scrapes game search page, returns 10 videos
  searchName: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://store.steampowered.com/search/?term=${query}&category1=998`
        )
        .then(response => {
          let $ = cheerio.load(response.data);

          $("a.search_result_row").each((i, element) => {
            let urlLink = $(element).attr("href");

            axios
              .get(urlLink)
              .then(response => {
                let $ = cheerio.load(response.data);

                $("div.highlight_movie").attr("data-webm-hd-source") &&
                  urlArray.push({
                    type: "steam",
                    name: $("div.apphub_AppName").text(),
                    smlImg: $("img.movie_thumb").attr("src"),
                    bigImg: $("img.game_header_image_full").attr("src"),
                    url: $("div.highlight_movie").attr("data-webm-hd-source")
                  });
              })
              .catch(err => reject(err));
            // console.log(urlArray);
            resolve(urlArray);
          });
        })
        .catch(err => reject(err));
    });
  }
};
