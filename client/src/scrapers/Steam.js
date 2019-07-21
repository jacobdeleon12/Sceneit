let cheerio = require("cheerio");
let axios = require("axios");

let urlResults = [];
let videoResults = [];
axios
  .get("https://store.steampowered.com//search/?filter=popularwishlist&os=win")
  .then(function(response) {
    let $ = cheerio.load(response.data);

    $("a.search_result_row").each(function(i, element) {
      let urlLink = $(element).attr("href");
      urlArray.push(urlLink);
    });
    return urlArray;
  })
  .then(
    // console.log(urlLink);
    axios.get(urlLink).then(function(response) {
      let $ = cheerio.load(response.data);

      let videoUrl = $("video");
      console.log(videoUrl);
      // videoResults.push(videoUrl);

      // urlResults.push(urlLink);
    })
  );

// for (let i = 0; i < urlResults.length; i++) {
//   // console.log(urlResults[i]);
//   axios.get(urlResults[i]).then(function(response) {
//     let $ = cheerio.load(response.data);

//     let videoUrl = $("video").attr("src");
//     videoResults.push(videoUrl);
//     console.log(videoResults);

//     // $("div#highlight_player_area").each(function(i, element) {
//     //   let videoUrl = $(element).attr("data-webm-hd-source");

//     // });
//   });
// }
