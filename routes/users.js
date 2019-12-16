const router = require("express").Router();
const {
  getUsersAsync,
  getUserByIdAsync,
  createUserAsync,
  updateUserByIdAsync,
  deleteUserByIdAsync
} = require("../controllers/users");
const collate = require("../middleware/collate");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(collate(User), getUsersAsync)
  .post(createUserAsync);

router
  .route("/:id")
  .get(getUserByIdAsync)
  .put(updateUserByIdAsync)
  .delete(deleteUserByIdAsync);

module.exports = router;
