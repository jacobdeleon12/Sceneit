const router = require("express").Router();
const videoController = require("../../controllers/videoController");

// Matches with "/api/video"
router
  .route("/")
  .get(videoController.findAll)
  .post(videoController.create);
// .put(videoController.update)

// Matches with "/api/video/:id"
router
  .route("/:id")
  .get(videoController.findById)
  .put(videoController.update);
// .delete(videoController.remove);

// Matches with "/api/video/:id"
router
  .route("/:id")
  .get(videoController.findById)
  // .put(videoController.update)
  .put(videoController.remove);

module.exports = router;
