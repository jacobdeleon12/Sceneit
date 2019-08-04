const db = require("../models");

const TMDB = require("./tmdb");
const STEAM = require("./steam");
const REDDIT = require("./reddit");
const YOUTUBE = require("./youtube");
const PLAYLIST = require("./playList");
const VIMEO = require("./vimeo");

TMDB.searchList("popularity");
// STEAM.searchList("popularwishlist");
// REDDIT.searchList("videos");
// YOUTUBE.searchList("mostPopular");
// PLAYLIST.searchPlayList("PL9tY0BWXOZFsPMZczEqnyvD-Z5ugOZrm8");
// VIMEO.searchList("staffpicks");

// TMDB.searchName("speed");
// STEAM.searchName("speed");
// REDDIT.searchName("speed");
// YOUTUBE.searchName("speed");
// PLAYLIST.searchChannel(vevoChannel, "speed");
// VIMEO.searchName("speed");

const videoArray = [];

module.exports = {
  addToDb: async function(tmdbQ, steamQ, redditQ, youtubeQ, vevoQ, vimeoQ) {
    try {
      // console.log("Hit TMDB");
      // const TMDBarr = await TMDB.searchList(tmdbQ);
      // console.log("Past TMDB");
      // console.log(TMDBarr);

      console.log("Hit STEAM");
      const STEAMarr = await STEAM.searchList(steamQ);
      console.log("Past STEAM");
      // console.log(STEAMarr);

      console.log("Hit REDDIT");
      const REDDITarr = await REDDIT.searchList(redditQ);
      console.log("Past REDDIT");
      // console.log(REDDITarr);

      console.log("Hit YOUTUBE");
      const YOUTUBEarr = await YOUTUBE.searchList(youtubeQ);
      console.log("Past YOUTUBE");
      // console.log(YOUTUBEarr);

      console.log("Hit PLAYLIST");
      const VEVOarr = await PLAYLIST.searchPlayList(vevoQ);
      console.log("Past PLAYLIST");
      // console.log(VEVOarr);

      console.log("Hit VIMEO");
      const VIMEOarr = await VIMEO.searchList(vimeoQ);
      console.log("Past VIMEO");
      // console.log(VIMEOarr);

      const query = { vidType: "mainPage" };
      const update = {
        videos: {
          // tmdb: TMDBarr,
          steam: STEAMarr,
          reddit: REDDITarr,
          youtube: YOUTUBEarr,
          vevo: VEVOarr,
          vimeo: VIMEOarr
        }
      };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      // Find the document
      db.Video.findOneAndUpdate(query, update, options, function(
        error,
        result
      ) {
        if (error) return;
        console.log(result);
      });

      console.log(videoArray);
    } catch (error) {
      console.log(error);
    }
  },
  searchByWord: async function(searchWord) {
    const vevoChannel = "UC2pmfLm7iq6Ov1UwYrWYkZA";

    try {
      const STEAMarr = await STEAM.searchName(searchWord);
      console.log("made it past steam");
      const REDDITarr = await REDDIT.searchName(searchWord);
      console.log("made it past reddit");
      const YOUTUBEarr = await YOUTUBE.searchName(searchWord);
      console.log("made it past youtube");
      const VEVOarr = await PLAYLIST.searchChannel(vevoChannel, searchWord);
      console.log("made it past vevo");
      const VIMEOarr = await VIMEO.searchName(searchWord);
      console.log("made it past vimeo");
      // const TMDBarr = await TMDB.searchName(searchWord);
      // console.log("made it past tmdn");

      videoArray.push({
        searched_word: searchWord,
        // tmdb: TMDBarr,
        steam: STEAMarr,
        reddit: REDDITarr,
        youtube: YOUTUBEarr,
        vevo: VEVOarr,
        vimeo: VIMEOarr
      });

      // console.log(videoArray);
      return videoArray;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
