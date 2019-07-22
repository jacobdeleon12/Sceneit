let cheerio = require("cheerio");
let axios = require("axios");

function steamScraper() {
  let urlArray = [];
  let steamArray = [];
  let numSkipped = 0;

  axios
    .get(
      "https://store.steampowered.com//search/?filter=popularwishlist&os=win"
    )
    .then(response => {
      let $ = cheerio.load(response.data);

      $("a.search_result_row").each((i, element) => {
        let urlLink = $(element).attr("href");
        urlArray.push(urlLink);
      });
      return urlArray;
    })
    .then(urlArray => {
      for (let url of urlArray) {
        axios.get(url).then(response => {
          let $ = cheerio.load(response.data);

          let vidName = $("div.apphub_AppName").text();
          let vidUrl = $("div.highlight_movie").attr("data-webm-hd-source");

          if (steamArray.length <= 22) {
            // console.log("push");
            vidUrl === undefined
              ? (numSkipped++, console.log(`Skiped ${numSkipped} Steam page`))
              : steamArray.push({ name: vidName, url: vidUrl });
          } else {
            // console.log("done");
            done();
          }
        });
      }
    });

  function done() {
    console.log(steamArray);
    return steamArray;
  }
}

export default steamScraper();
