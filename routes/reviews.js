const router = require("express").Router({ mergeParams: true }); // mergeParams: Preserve the req.params values from the parent router.
const {
  getReviewsAsync,
  getReviewByIdAsync,
  createReviewAsync,
  updateReviewByIdAsync,
  deleteReviewByIdAsync
} = require("../controllers/reviews");
const collate = require("../middleware/collate");
const Review = require("../models/Review");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    collate(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    getReviewsAsync
  )
  .post(protect, authorize("user", "admin"), createReviewAsync);

router
  .route("/:id")
  .get(getReviewByIdAsync)
  .put(protect, authorize("user", "admin"), updateReviewByIdAsync)
  .delete(protect, authorize("user", "admin"), deleteReviewByIdAsync);

module.exports = router;
