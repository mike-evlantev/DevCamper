const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");
const asyncHandler = require("../middleware/async");

// @route   GET api/v1/reviews
// @route   GET api/v1/bootcamps/:bootcampId/reviews
// @desc    Get reviews
// @access  Public
exports.getReviewsAsync = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.collation);
  }
});

// @route   GET api/v1/reviews/:id
// @desc    Get review by id
// @access  Public
exports.getReviewByIdAsync = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });
  if (!review) {
    return next(new ErrorResponse(`Review not found`, 404));
  }
  return res.status(200).json({ success: true, data: review });
});

// @route   POST api/v1/bootcamps/:bootcampId/reviews
// @desc    Create review
// @access  Private
exports.createReviewAsync = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  const review = await Review.create(req.body);

  return res.status(201).json({ success: true, data: review });
});

// @route   PUT api/v1/reviews/:id
// @desc    Update review
// @access  Private
exports.updateReviewByIdAsync = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse(`Review not found`, 404));
  }
  // Is user review owner?
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User not authorized to update review`, 401));
  }
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  // TODO: fix average rating on update
  // calling to trigger 'post save' middleware on schema
  // review.getAverageRating(review.bootcamp);
  return res.status(201).json({ success: true, data: review });
});
