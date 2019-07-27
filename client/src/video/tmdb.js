// let axios = require("axios");
import axios from "axios";
// let API = require("../utils/API");
import API from "../utils/API";

let urlArray = [];

function tmdb() {
  API.tmdbTop().then(response => {
    for (const movie of response.data.results) {
      API.tmdbSearchId(movie.id).then(response => {
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
