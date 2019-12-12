const courseRouter = require("./courses"); // Include routers for other resources
const router = require("express").Router();
const {
  getBootcampsAsync,
  getBootcampByIdAsync,
  createBootcampAsync,
  updateBootcampByIdAsync,
  deleteBootcampByIdAsync,
  getBootcampsByDistanceAsync
} = require("../controllers/bootcamps");

// Reroute into other resource router
router.use("/:bootcampId/courses", courseRouter);

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
