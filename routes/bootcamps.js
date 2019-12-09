const router = require("express").Router();
const {
  getBootcampsAsync,
  getBootcampByIdAsync,
  createBootcampAsync,
  updateBootcampByIdAsync,
  deleteBootcampByIdAsync,
  getBootcampsByDistanceAsync
} = require("../controllers/bootcamps");

router.route("/radius/:zipcode/:distance").get(getBootcampsByDistanceAsync);

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
