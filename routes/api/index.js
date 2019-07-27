const router = require("express").Router();
const userRoutes = require("./users");
const videoRoutes = require("./videos");

// User routes
router.use("/users", userRoutes);
router.use("/videos", videoRoutes);

module.exports = router;
