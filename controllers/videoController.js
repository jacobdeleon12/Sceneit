const db = require("../models");
const videos = require("../video");

// Defining methods for the UsersController
module.exports = {
  searchApi: async function (req, res) {
    // console.log(req);
    console.log(req.params.searchWord);
    
    const results = await videos.searchByWord(req.params.searchWord)
    res.json(results)
      // .then(results => res.json(results))
      // .catch(err => res.status(422).json(err));
  }
};
