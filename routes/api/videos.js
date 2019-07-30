const router = require("express").Router();
const videoController = require("../../controllers/videoController");

// Matches with "/api/user"
router
  .route("/:id")
  .get(videoController.findById)
  .put(videoController.update);

module.exports = router;
