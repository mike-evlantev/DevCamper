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
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = JSON.parse(queryStr);
  const bootcamps =
    Object.keys(query).length === 0 // is the query object empty?
      ? await Bootcamp.find()
      : await Bootcamp.find(query);
  if (!bootcamps) {
    return next(new ErrorResponse(`No Bootcamps found`, 404));
  }
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
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
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
