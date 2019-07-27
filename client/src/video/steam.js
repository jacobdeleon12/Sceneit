let cheerio = require("cheerio");
let axios = require("axios");

function steamScraper() {
  let steamArray = [];
  let numSkipped = 0;
  let urlArray = [];

  axios
    .get(
      "https://store.steampowered.com//search/?filter=popularwishlist&os=win"
    )
    .then(response => {
      let $ = cheerio.load(response.data);

      $("a.search_result_row").each((i, element) => {
        let urlLink = $(element).attr("href");
        steamArray.push(urlLink);
      });
      return steamArray;
    })
    .then(steamArray => {
      for (let url of steamArray) {
        axios.get(url).then(response => {
          let $ = cheerio.load(response.data);

          let vidName = $("div.apphub_AppName").text();
          let vidUrl = $("div.highlight_movie").attr("data-webm-hd-source");

          vidUrl && urlArray.push({ name: vidName, url: vidUrl });
          // console.log({ name: vidName, url: vidUrl });
          if (urlArray.length === 10) {
            done();
          }
        });
      }
    });

  function done() {
    console.log(urlArray);
    return urlArray;
  }
}

steamScraper();

// export default steamScraper();
