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
const collate = require("../middleware/collate");
const Bootcamp = require("../models/Bootcamp");
const { protect } = require("../middleware/auth");

// Reroute into other resource router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsByDistanceAsync);

router.route("/:id/photo").put(protect, uploadBootcampPhotoAsync);

router
  .route("/")
  .get(collate(Bootcamp, "courses"), getBootcampsAsync)
  .post(protect, createBootcampAsync);

router
  .route("/:id")
  .get(getBootcampByIdAsync)
  .put(protect, updateBootcampByIdAsync)
  .delete(protect, deleteBootcampByIdAsync);

module.exports = router;
