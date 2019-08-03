const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    // console.log(req);
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    // console.log(req);
    db.User
      .findOne({ googleId: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    // console.log(req);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    // console.log(req);
    db.User
      .findOneAndUpdate({ googleId: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    // console.log(req);
    db.User
      .findOneAndUpdate({ vStr: req.params.id }, req.body)
      .then(dbModel => console.log(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
