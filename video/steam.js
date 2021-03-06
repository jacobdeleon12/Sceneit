const cheerio = require("cheerio");
const axios = require("axios");

module.exports = {
  // try "popularwishlist"
  // Scrapes list page, returns 10 videos
  searchList: function(query) {
    let urlArray = [];
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
                let $ = cheerio.load(response.data);

                $("div.highlight_movie").attr("data-webm-hd-source") &&
                  urlArray.push({
                    type: "steam",
                    name: $("div.apphub_AppName").text(),
                    smlImg: $("img.movie_thumb").attr("src"),
                    bigImg: $("img.game_header_image_full").attr("src"),
                    url: $("div.highlight_movie").attr("data-webm-hd-source")
                  });
                if (i >= 20) {
                  return false;
                } else {
                  // console.log(urlArray);
                  resolve(urlArray);
                }
              })
              .catch(err => reject(err));
          });
        })
        .catch(err => reject(err));
    });
  },

  // Scrapes game search page, returns 10 videos
  searchName: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://store.steampowered.com/search/?term=${query}&category1=998`
        )
        .then(response => {
          let $ = cheerio.load(response.data);
          const searchPage = $("a.search_result_row").attr();
          // console.log(searchPage);

          let count = 0;

          if (searchPage) {
            $("a.search_result_row").each((i, element) => {
              let urlLink = $(element).attr("href");
              axios
                .get(urlLink)
                .then(response => {
                  let $ = cheerio.load(response.data);
                  count++;
                  console.log(count);

                  if (i >= 10) {
                    return false;
                  } else {
                    $("div.highlight_movie").attr("data-webm-hd-source") &&
                      urlArray.push({
                        type: "steam",
                        name: $("div.apphub_AppName").text(),
                        smlImg: $("img.movie_thumb").attr("src"),
                        bigImg: $("img.game_header_image_full").attr("src"),
                        url: $("div.highlight_movie").attr(
                          "data-webm-hd-source"
                        )
                      });
                  }
                  // console.log(urlArray);
                  resolve(urlArray);
                })
                .catch(err => reject(err));
              if (i >= 10) {
                return false;
              }
            });
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
