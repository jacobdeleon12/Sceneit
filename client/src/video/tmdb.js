let axios = require("axios");
require('dotenv').config()

// const apiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
console.log(apiKey);

axios
  .get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`
  )
  .then(response => {
    for (const movie of response.data.results) {
      const id = movie.id;
      console.log(id);
      
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
        )
        .then(response => {
          response.data.videos.results[0] !== undefined
            ? console.log(response.data.videos.results[0].key)
            : console.log("Nothing here")
          // console.log(response.data.videos.results[0]);
          
        });
    }
  });

