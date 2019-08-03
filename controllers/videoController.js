const db = require("../models");
const videos = require("../video");

// Defining methods for the UsersController
module.exports = {
  searchAll: async function(req, res) {
    // console.log(req);
    const results = await videos.searchByWord(req.params.searchWord);
    res.json(results)
    // .catch(err => res.status(422).json(err));
  },
  returnAll: function(req, res) {
    // console.log(req);
    db.Video.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
