import axios from "axios";

const apiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";

const searchId = query => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&append_to_response=videos`
  );
};

export default {
  // try "popularity"
  // Queries TMDB list, returns 10 videos
  searchList: function(query) {
    let urlArray = [];

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${query}.desc&include_adult=false&page=1`
      )
      .then(response => {
        for (const movie of response.data.results) {
          searchId(movie.id)
            .then(response => {
              response.data.videos.results[0] &&
                urlArray.push({
                  name: response.data.original_title,
                  url: `https://www.youtube.com/embed/${response.data.videos.results[0].key}`
                });

              if (urlArray.length === 10) {
                console.log(urlArray);
                return urlArray;
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  },

  // Queries TMDB name, returns 10 videos
  searchName: function(query) {
    let urlArray = [];

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then(response => {
        for (const movie of response.data.results) {
          searchId(movie.id)
            .then(response => {
              response.data.videos.results[0] &&
                urlArray.push({
                  name: response.data.original_title,
                  url: `https://www.youtube.com/embed/${response.data.videos.results[0].key}`
                });

              if (urlArray.length === 10) {
                console.log(urlArray);
                return urlArray;
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
};
