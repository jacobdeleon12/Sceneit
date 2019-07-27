const router = require("express").Router();
const videoController = require("../../controllers/videoController");

// Matches with "/api/user"
router
  .route("/")
  .get(videoController.findAll)
  .post(videoController.create)
  .put(videoController.update);


module.exports = router;