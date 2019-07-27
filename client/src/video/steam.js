let cheerio = require("cheerio");
let axios = require("axios");

export default {
  // try "popularwishlist"
  // Scrapes list page, returns 10 videos
  searchList: function(query) {
    let steamArray = [];
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
            steamArray.push(urlLink);
          });
        })
        .catch(err => reject(err))
        .then(response => {
          for (let url of steamArray) {
            axios
              .get(url)
              .then(response => {
                let $ = cheerio.load(response.data);

                let vidName = $("div.apphub_AppName").text();
                let vidUrl = $("div.highlight_movie").attr(
                  "data-webm-hd-source"
                );

                vidUrl &&
                  urlArray.push({
                    type: "steam",
                    name: vidName,
                    url: vidUrl
                  });
                if (urlArray.length === 10) {
                  // console.log(urlArray);
                  resolve(urlArray);
                }
              })
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  },

  // Scrapes game search page, returns 10 videos
  searchName: function(query) {
    let steamArray = [];
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://store.steampowered.com/search/?term=${query}&category1=998`
        )
        .then(response => {
          let $ = cheerio.load(response.data);

          $("a.search_result_row").each((i, element) => {
            let urlLink = $(element).attr("href");
            steamArray.push(urlLink);
          });
          return steamArray;
        })
        .catch(err => reject(err))
        .then(steamArray => {
          for (let url of steamArray) {
            axios
              .get(url)
              .then(response => {
                let $ = cheerio.load(response.data);

                let vidName = $("div.apphub_AppName").text();
                let vidUrl = $("div.highlight_movie").attr(
                  "data-webm-hd-source"
                );

                vidUrl &&
                  urlArray.push({
                    type: "steam",
                    name: vidName,
                    url: vidUrl
                  });
                // console.log({ name: vidName, url: vidUrl });
                if (urlArray.length === 10) {
                  console.log(urlArray);
                  resolve(urlArray);
                }
              })
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  }
};
