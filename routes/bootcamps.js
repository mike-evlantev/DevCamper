const courseRouter = require("./courses"); // Include routers for other resources
const router = require("express").Router();
const {
  createBootcampAsync,
  deleteBootcampByIdAsync,
  getBootcampByIdAsync,
  getBootcampsAsync,
  getBootcampsByDistanceAsync,
  updateBootcampByIdAsync,
  uploadBootcampPhotoAsync
} = require("../controllers/bootcamps");

// Reroute into other resource router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsByDistanceAsync);

router.route("/:id/photo").put(uploadBootcampPhotoAsync);

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
