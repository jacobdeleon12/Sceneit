const axios = require("axios");
const cheerio = require("cheerio");
TMDB_API = "f156e9ea";
module.exports = {
  // try "trailers"
  // Queries TMDB list, returns 20 videos
  searchList: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(`https://www.imdb.com/movies-coming-soon`)
        .then(response => {
          let $ = cheerio.load(response.data);
          $("td.overview-top").each(function(i, element) {
            const name = $(element)
              .find("h4")
              .find("a")
              .attr("title");
            const imdbId = $(element)
              .find("h4")
              .find("a")
              .attr("href");
            axios.get(`https://www.imdb.com${imdbId}`).then(response => {
              let $ = cheerio.load(response.data);
              const trailerID = $("a.slate_button").attr("data-video");
              const poster = $("a.slate_button")
                .find("img")
                .attr("src");
              if (i >= 20) {
                return false;
              } else {
                trailerID &&
                  urlArray.push({
                    type: "imdb",
                    name: name,
                    smlImg: poster,
                    bigImg: poster,
                    url: `https://www.imdb.com/videoembed/${trailerID}`
                  });
              }
              // console.log(urlArray);
              resolve(urlArray);
            });
          });
        })
        .catch(err => reject(err));
    });
  },
  // try "speed"
  // Queries TMDB name, returns 10 videos
  searchName: function(query) {
    let urlArray = [];
    return new Promise(function(resolve, reject) {
      axios
        .get(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=${TMDB_API}`)
        .then(response => {
          let movieArr = response.data.Search;
          let count = 0;
          // console.log(movieArr);
          if (movieArr) {
            for (const movie of movieArr) {
              const name = movie.Title;
              const imdbId = movie.imdbID;
              axios
                .get(`https://www.imdb.com/title/${imdbId}`)
                .then(response => {
                  let $ = cheerio.load(response.data);
                  const trailerID = $("a.slate_button").attr("data-video");
                  const poster = $("a.slate_button")
                    .find("img")
                    .attr("src");
                  count++;
                  console.log(count);
                  // console.log(trailerID);
                  trailerID &&
                    urlArray.push({
                      type: "imbd",
                      name: name,
                      smlImg: poster,
                      bigImg: poster,
                      url: `https://www.imdb.com/videoembed/${trailerID}`
                    });
                  if (count >= 9) {
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
