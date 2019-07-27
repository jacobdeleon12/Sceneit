import TMDB from "../video/tmdb";
import STEAM from "../video/steam";
import REDDIT from "../video/reddit";
import YOUTUBE from "../video/youtube";
import API from "../utils/API";


// TMDB.searchList("popularity");
// STEAM.searchList("popularwishlist");
// REDDIT.searchList("videos");
// YOUTUBE.searchList("mostPopular");

// TMDB.searchName("speed");
// STEAM.searchName("speed");
// REDDIT.searchName("speed");
// YOUTUBE.searchName("speed");

async function addToDb() {
  try {
    const TMDBarr = await TMDB.searchList("popularity");
    // const STEAMarr = await STEAM.searchList("popularwishlist");
    // const REDDITarr = await REDDIT.searchList("videos");
    // const YOUTUBEarr = await YOUTUBE.searchList("mostPopular");

    // const TMDBarr = await TMDB.searchName("speed");
    // const STEAMarr = await STEAM.searchName("speed");
    // const REDDITarr = await REDDIT.searchName("speed");
    // const YOUTUBEarr = await YOUTUBE.searchName("speed");

    API.saveVideoObj({
      $set: {
        vidType: "tmdb",
        videos: TMDBarr
      }
    })
    .then(res => {
      console.log("New user, info added to DB");
      // console.log(res);
    })
    .catch(err => console.log(err));


    // console.log(TMDBarr);
    // console.log(STEAMarr);
    // console.log(REDDITarr);
    // console.log(YOUTUBEarr);
    
  } catch (error) {
    console.log(error.message);
    
  }
    
}

export default addToDb;
