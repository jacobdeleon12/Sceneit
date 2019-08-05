const router = require("express").Router();
const userController = require("../../controllers/usersController");

// Matches with "/api/user"
router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);
// .put(userController.update)

router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update);
// .delete(userController.remove);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  // .put(userController.update)
  .put(userController.remove);


module.exports = router;
