const router = require("express").Router({ mergeParams: true }); // mergeParams: Preserve the req.params values from the parent router.
const { getReviewsAsync } = require("../controllers/reviews");
const collate = require("../middleware/collate");
const Review = require("../models/Review");
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(
  collate(Review, {
    path: "bootcamp",
    select: "name description"
  }),
  getReviewsAsync
);
//   .post(protect, authorize("publisher", "admin"), createCourseAsync);
// router
//   .route("/:id")
//   .get(getCourseByIdAsync)
//   .put(protect, authorize("publisher", "admin"), updateCourseByIdAsync)
//   .delete(protect, authorize("publisher", "admin"), deleteCourseByIdAsync);

module.exports = router;
