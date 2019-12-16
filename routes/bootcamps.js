const courseRouter = require("./courses"); // Include routers for other resources
const reviewRouter = require("./reviews"); // Include routers for other resources
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
const collate = require("../middleware/collate");
const Bootcamp = require("../models/Bootcamp");
const { protect, authorize } = require("../middleware/auth");

// Reroute into other resource router
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsByDistanceAsync);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), uploadBootcampPhotoAsync);

router
  .route("/")
  .get(collate(Bootcamp, "courses"), getBootcampsAsync)
  .post(protect, authorize("publisher", "admin"), createBootcampAsync);

router
  .route("/:id")
  .get(getBootcampByIdAsync)
  .put(protect, authorize("publisher", "admin"), updateBootcampByIdAsync)
  .delete(protect, authorize("publisher", "admin"), deleteBootcampByIdAsync);

module.exports = router;
