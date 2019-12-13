const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
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

// @route   POST api/v1/bootcamp/:bootcampId/courses
// @desc    Create a course
// @access  Private
exports.createCourseAsync = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Selected bootcamp not found with id ${req.params.bootcampId}`,
        404
      )
    );
  }
  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course
  });
});

// @route   PUT api/v1/courses/:id
// @desc    Update a course
// @access  Private
exports.updateCourseByIdAsync = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,
    data: course
  });
});

// @route   DELETE api/v1/courses/:id
// @desc    Remove a course
// @access  Private
exports.deleteCourseByIdAsync = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    );
  }
  await course.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});
