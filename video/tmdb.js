const axios = require("axios");

const apiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";

const searchId = query => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&append_to_response=videos`
  );
};

let urlArray = [];

module.exports = {
  // try "popularity"
  // Queries TMDB list, returns 10 videos
  searchList: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${query}.desc&include_adult=false&page=1&append_to_response=videos`
        )
        .then(response => {
          for (const movie of response.data.results) {
            searchId(movie.id)
              .then(response => {
                response.data.videos.results[0] &&
                  urlArray.push({
                    type: "tmbd",
                    name: response.data.title,
                    smlImg: `http://image.tmdb.org/t/p/w500${response.data.poster_path}`,
                    bigImg: `http://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
                    url: `https://www.youtube.com/embed/${response.data.videos.results[0].key}`
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

  // try "speed"
  // Queries TMDB name, returns 10 videos
  searchName: function(query) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then(response => {          
          for (let obj of response.data.results) {
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${obj.id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
              )
              .then(response => {
                response.data.videos.results[0] &&
                  urlArray.push({
                    type: "tmbd",
                    name: response.data.title,
                    smlImg: `http://image.tmdb.org/t/p/w500${response.data.poster_path}`,
                    bigImg: `http://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
                    url: `https://www.youtube.com/embed/${response.data.videos.results[0].key}`
                  });

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