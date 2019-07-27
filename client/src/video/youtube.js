let axios = require("axios");
import API from "../utils/API";
const tmdbApiKey = process.env.TMDB_API;

require("dotenv").config();

// const apiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";
// const apiKey = process.env.REACT_APP_TMDB_API_KEY;
// const apiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";
let urlArray = [];

function tmdb() {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`
    )
    .then(response => {
      for (const movie of response.data.results) {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${tmdbApiKey}&append_to_response=videos`
          )
          .then(response => {
            response.data.videos.results[0] &&
              urlArray.push({
                name: response.data.original_title,
                url: `https://www.youtube.com/embed/${response.data.videos.results[0].key}`
              });

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

tmdb();

// export default tmdb();
