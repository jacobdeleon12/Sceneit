const TMDB = require("./tmdb");
const STEAM = require("./steam");
const REDDIT = require("./reddit");
const YOUTUBE = require("./youtube");
const PLAYLIST = require("./playList");
const VIMEO = require("./vimeo");

// const steamQ = "popularwishlist";
// const tmdbQ = "popularity";
// const redditQ = "videos";
// const youtubeQ = "mostPopular";
// const playListQ = "PL9tY0BWXOZFsPMZczEqnyvD-Z5ugOZrm8";
// const vimeoQ = "staffpicks";

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

let videoArr = [];

module.exports = {
  // try "videos"
  // Queries Reddit sub, returns 10 videos
  addToDb: async function(steamQ, tmdbQ, redditQ, youtubeQ, playListQ, vimeoQ) {
      try {
        const STEAMarr = await STEAM.searchList(steamQ);
        const TMDBarr = await TMDB.searchList(tmdbQ);
        const REDDITarr = await REDDIT.searchList(redditQ);
        const YOUTUBEarr = await YOUTUBE.searchList(youtubeQ);
        const VEVOarr = await PLAYLIST.searchPlayList(playListQ);
        const VIMEOarr = await VIMEO.searchList(vimeoQ);
    
        videoArr.push({
          steam: STEAMarr,
          tmdb: TMDBarr,
          reddit: REDDITarr,
          youtube: YOUTUBEarr,
          vevo: VEVOarr,
          vimeo: VIMEOarr
        });
    
        console.log(videoArr);
      } catch (err) {
        console.log(err);
      }
    
  }
};


// async function addToDb() {
//   try {
//     const STEAMarr = await STEAM.searchList("popularwishlist");
//     const TMDBarr = await TMDB.searchList("popularity");
//     const REDDITarr = await REDDIT.searchList("videos");
//     const YOUTUBEarr = await YOUTUBE.searchList("mostPopular");
//     const VEVOarr = await PLAYLIST.searchPlayList(vevoPlayList);
//     const VIMEOarr = await VIMEO.searchList("staffpicks");

//     videoArr.push({
//       steam: STEAMarr,
//       tmdb: TMDBarr,
//       reddit: REDDITarr,
//       youtube: YOUTUBEarr,
//       vevo: VEVOarr,
//       vimeo: VIMEOarr
//     });

//     console.log(videoArr);
//     // resolve(urlArray);
//   } catch (error) {
//     console.log(error);
//   }
// }
// addToDb();
// export default addToDb;
