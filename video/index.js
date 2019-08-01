const db = require("../models");

const TMDB = require("./tmdb");
const STEAM = require("./steam");
const REDDIT = require("./reddit");
const YOUTUBE = require("./youtube");
const PLAYLIST = require("./playList");
const VIMEO = require("./vimeo");

// const vevoPlayList = "PL9tY0BWXOZFsPMZczEqnyvD-Z5ugOZrm8";
const vevoChannel = "UC2pmfLm7iq6Ov1UwYrWYkZA";

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
// VIMEO.searchName("speed");

const videoArray = [];

module.exports = {
  addToDb: async function(steamQ, tmdbQ, redditQ, youtubeQ, vevoQ, vimeoQ) {
    try {
      const STEAMarr = await STEAM.searchList(steamQ);
      const TMDBarr = await TMDB.searchList(tmdbQ);
      const REDDITarr = await REDDIT.searchList(redditQ);
      const YOUTUBEarr = await YOUTUBE.searchList(youtubeQ);
      const VEVOarr = await PLAYLIST.searchPlayList(vevoQ);
      const VIMEOarr = await VIMEO.searchList(vimeoQ);

      videoArray.push({
        steam: STEAMarr,
        tmdb: TMDBarr,
        reddit: REDDITarr,
        youtube: YOUTUBEarr,
        vevo: VEVOarr,
        vimeo: VIMEOarr
      });

      const query = { vidType: "mainPage" };
      const update = { videos: videoArray };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      // Find the document
      db.Video.findOneAndUpdate(query, update, options, function(
        error,
        result
      ) {
        if (error) return;
        console.log(result);
      });

      // console.log(videoArray);
    } catch (error) {
      console.log(error);
    }
  },
  searchByWord: async function(searchWord) {
    console.log(searchWord);
    
    try {
      const STEAMarr = await STEAM.searchName(searchWord);
      console.log("made it past steam");

      // const TMDBarr = await TMDB.searchName(searchWord);
      // console.log("made it past steam");

      const REDDITarr = await REDDIT.searchName(searchWord);
      console.log("made it past reddit");

      const YOUTUBEarr = await YOUTUBE.searchName(searchWord);
      console.log("made it past youtube");

      const VEVOarr = await PLAYLIST.searchChannel(vevoChannel, searchWord);
      console.log("made it past vevo");

      const VIMEOarr = await VIMEO.searchName(searchWord);
      console.log("made it past vimeo");

      videoArray.push({
        steam: STEAMarr,
        // tmdb: TMDBarr,
        reddit: REDDITarr,
        youtube: YOUTUBEarr,
        vevo: VEVOarr,
        vimeo: VIMEOarr
      });

      console.log(videoArray);
      return videoArray;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
// addToDb();