import axios from "axios";

const apiKey = "7b07c1ac2c9e9a9f62cfc49a4ec55f99";

const searchId = query => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&append_to_response=videos`
  );
};

export default {
  // searchList2: async function(query) {

  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${query}.desc&include_adult=false&page=1&append_to_response=videos`
  //       );
  //       const urlArray = [];
  //       await response.data.results.forEach(async element => {

  //       const movie = await searchId(element.id);
  //       // console.log(movie.data.videos.results[0].key);
  //       movie.data.videos.results[0] &&
  //       urlArray.push({
  //         type: "tmbd",
  //         name: movie.data.original_title,
  //         url: `https://www.youtube.com/embed/${movie.data.videos.results[0].key}`
  //       });
  //     });
  //     console.log(urlArray);
  //     if (urlArray.length === 10) {
  //       // console.log(urlArray);
  //       return urlArray;
  //     }
  //   } catch (error) {
  //     console.log("im here");
  //   }
  // },

  // try "popularity"
  // Queries TMDB list, returns 10 videos
  searchList: function(query) {
    let urlArray = [];
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
                    name: response.data.original_title,
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

  // Queries TMDB name, returns 10 videos
  searchName: function(query) {
    let urlArray = [];
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
                    type: "tmdb",
                    name: response.data.original_title,
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
  }
};
