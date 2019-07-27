import TMDB from "../video/tmdb";
import STEAM from "../video/steam";
import REDDIT from "../video/reddit";
import YOUTUBE from "../video/youtube";

// TMDB.searchList("popularity");
// STEAM.searchList("popularwishlist");
// REDDIT.searchList("videos");
// YOUTUBE.searchList("mostPopular");

// TMDB.searchName("speed");
// STEAM.searchName("speed");
// REDDIT.searchName("speed");
// YOUTUBE.searchName("speed");

async function addToDb() {
  //   TMDB.searchList("popularity");
  STEAM.searchList("popularwishlist").then(res => {
    console.log(res);
  });
  //   console.log(await STEAM.searchList("popularwishlist"));

  // REDDIT.searchList("videos");
  // YOUTUBE.searchList("mostPopular");

  //   API.saveVideoObj(response.profileObj)
  //     .then(res => {
  //       console.log("New user, info added to DB");
  //       window.location.replace("/main");
  //     })
  //     .catch(err => console.log(err));
}

addToDb();
