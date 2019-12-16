const router = require("express").Router();
const { updateUserByIdAsync } = require("../controllers/users");
const collate = require("../middleware/collate");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/:id")
  //.get(getBootcampByIdAsync)
  .put(protect, authorize("admin"), updateUserByIdAsync);
//.delete(protect, authorize("admin"), deleteBootcampByIdAsync);

module.exports = router;
