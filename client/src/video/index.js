import TMDB from "./tmdb";
// import STEAM from "./steam";
import REDDIT from "./reddit";
import YOUTUBE from "./youtube";
import PLAYLIST from "./playList";
import VIMEO from "./vimeo";
// import API from "../utils/API";

// const tmbdObjId = "5d3cb2a83bef5a333c9ff6c0";
// const steamObjId = "5d3cb2a83bef5a333c9ff6c1";
// const youtubeObjId = "5d3cb2a83bef5a333c9ff6c2";
// const redditObjId = "5d3cb2a83bef5a333c9ff6c3";

const vevoPlayList = "PL9tY0BWXOZFsPMZczEqnyvD-Z5ugOZrm8";
// const vevoChannel = "UC2pmfLm7iq6Ov1UwYrWYkZA";

// TMDB.searchList("popularity");
// STEAM.searchList("popularwishlist");
// REDDIT.searchList("videos");
// YOUTUBE.searchList("mostPopular");
// PLAYLIST.searchPlayList(vevoPlayList);
// VIMEO.searchList("staffpicks");

// TMDB.searchName("speed");
// STEAM.searchName("speed");
// REDDIT.searchName("speed");
// YOUTUBE.searchName("speed");
// PLAYLIST.searchChannel(vevoChannel, "Justin");
// VIMEO.searchName("the matrix");


async function addToDb() {
  // const bigObj = [];
  try {
    // const STEAMarr = await STEAM.searchList("popularwishlist");
    // localStorage.setItem("steam", JSON.stringify(STEAMarr));
    // console.log(STEAMarr);

    const TMDBarr = await TMDB.searchList("popularity");
    localStorage.setItem("tmdb", JSON.stringify(TMDBarr));
    // console.log(TMDBarr);

    const REDDITarr = await REDDIT.searchList("videos");
    localStorage.setItem("reddit", JSON.stringify(REDDITarr));
    // console.log(REDDITarr);

    const YOUTUBEarr = await YOUTUBE.searchList("mostPopular");
    localStorage.setItem("youtube", JSON.stringify(YOUTUBEarr));
    // console.log(YOUTUBEarr);

    // const VEVOarr = await PLAYLIST.searchPlayList(vevoPlayList);
    // localStorage.setItem("vevo", JSON.stringify(VEVOarr));
    // console.log(VEVOarr);

    // const VIMEOarr = await VIMEO.searchList("staffpicks");
    // localStorage.setItem("vimeo", JSON.stringify(VIMEOarr));
    // console.log(VIMEOarr);

  } catch (error) {
    console.log(error);
  }
}
// addToDb();
export default addToDb;
