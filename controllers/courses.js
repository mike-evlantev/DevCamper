const ErrorResponse = require("../utils/errorResponse");
const Course = require("../models/Course");
const asyncHandler = require("../middleware/async");

// @route   GET api/v1/courses
// @route   GET api/v1/bootcamps/:bootcampId/courses
// @desc    Get courses
// @access  Public
exports.getCoursesAsync = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description"
    });
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    //pagination,
    data: courses
  });
});

// @route   GET api/v1/courses/:id
// @desc    Get course by Id
// @access  Public
exports.getCourseByIdAsync = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: course
  });
});
