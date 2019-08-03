const router = require("express").Router();
const videoController = require("../../controllers/videoController");

// Matches with "/api/videos"
router.route("/:searchWord").get(videoController.searchAll);
router.route("/").get(videoController.returnAll);

module.exports = router;
