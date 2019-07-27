const router = require("express").Router();
const userController = require("../../controllers/usersController");

// Matches with "/api/user"
router
  .route("/")
  .get(userController.findAll)
  .post(userController.create)
  .put(userController.update);


module.exports = router;