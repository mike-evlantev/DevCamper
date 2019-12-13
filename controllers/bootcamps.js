const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");

const _earthRadius = 3962;

// @route   GET api/v1/bootcamps
// @desc    Get all bootcamps
// @access  Public
exports.getBootcampsAsync = asyncHandler(async (req, res, next) => {
  let query;
  // Copy req.query
  const reqQuery = { ...req.query };
  // Fields to remove
  const removeFields = ["select", "sort", "page", "limit"];
  // Loop through removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  // Create operators ($gt, $gte, etc.)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  // Build query
  query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");
  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;
  if (!bootcamps) {
    return next(new ErrorResponse(`No Bootcamps found`, 404));
  }
  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0 && startIndex < total) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps
  });
});

// @route   GET api/v1/bootcamps/:id
// @desc    Get bootcamp by Id
// @access  Public
exports.getBootcampByIdAsync = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @route   GET api/v1/bootcamps/radius/:zipcode/:distance
// @desc    Get bootcamps within a distance
// @access  Private
exports.getBootcampsByDistanceAsync = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // Get lat/long from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;
  // Calc radius using radians - divide distance by radius of earth
  const radius = distance / _earthRadius; // UOM Radian
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], radius] } }
  });
  if (!bootcamps) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @route   POST api/v1/bootcamps
// @desc    Create a bootcamp
// @access  Private
exports.createBootcampAsync = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @route   PUT api/v1/bootcamps/:id
// @desc    Update bootcamp by Id
// @access  Private
exports.updateBootcampByIdAsync = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @route   DELETE api/v1/bootcamps/:id
// @desc    Delete bootcamp by Id
// @access  Private
exports.deleteBootcampByIdAsync = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  bootcamp.remove(); // triggers cascading courses delete via middleware
  res.status(200).json({ success: true, data: {} });
});
