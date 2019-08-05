const axios = require("axios");
const cheerio = require("cheerio");

TMDB_API = "f156e9ea";

let urlArray = [];

module.exports = {
  // try "trailers"
  // Queries TMDB list, returns 20 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(`https://www.imdb.com/${query}`)
        .then(response => {
          let $ = cheerio.load(response.data);

          $("div.trailer-item").each(function(i, element) {
            const name = $(element)
              .find("div.trailer-caption")
              .find("a")
              .text()
              .trim();
            const img = $(element)
              .find("a")
              .find("img")
              .attr("src");
            const imdbId = $(element).attr("data-videoid");

            if (i >= 20) {
              return false;
            } else {
              imdbId &&
                urlArray.push({
                  type: "imdb",
                  name: name,
                  smlImg: img,
                  bigImg: img,
                  url: `https://www.imdb.com/videoembed/${imdbId}`
                });
            }
          });
          // console.log(urlArray);
          resolve(urlArray);
        })
        .catch(err => reject(err));
    });
  },

  // try "speed"
  // Queries TMDB name, returns 10 videos
  searchName: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=${TMDB_API}`)
        .then(response => {
          let movieArr = response.data.Search;
          let count = 0;
          // console.log(response.data.Search);

          if (movieArr) {
            for (const movie of movieArr) {
              const img = movie.Poster;
              const name = movie.Title;
              const imdbId = movie.imdbID;

              axios
                .get(`https://www.imdb.com/title/${imdbId}`)
                .then(response => {
                  let $ = cheerio.load(response.data);
                  const trailerID = $("a.slate_button").attr("data-video");
                  count++;
                  console.log(count);

                  trailerID === undefined &&
                    urlArray.push({
                      type: "imbd",
                      name: name,
                      smlImg: img,
                      bigImg: img,
                      url: `https://www.imdb.com/videoembed/${trailerID}`
                    });
                  if (count >= 10) {
                    // console.log(urlArray);
                    resolve(urlArray);
                  }
                })
                .catch(err => reject(err));
            }
          } else {
            console.log("found nothing");
            resolve(urlArray);
          }
        })
        .catch(err => reject(err));
    });
  }
};
