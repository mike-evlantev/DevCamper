const router = require("express").Router();
const {
  getBootcampsAsync,
  getBootcampByIdAsync,
  createBootcampAsync,
  updateBootcampByIdAsync,
  deleteBootcampByIdAsync
} = require("../controllers/bootcamps");

router
  .route("/")
  .get(getBootcampsAsync)
  .post(createBootcampAsync);

router
  .route("/:id")
  .get(getBootcampByIdAsync)
  .put(updateBootcampByIdAsync)
  .delete(deleteBootcampByIdAsync);

module.exports = router;
