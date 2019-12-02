const Bootcamp = require("../models/Bootcamp");

// @route   GET api/v1/bootcamps
// @desc    Get all bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get all bootcamps" });
};

// @route   GET api/v1/bootcamps/:id
// @desc    Get bootcamp by Id
// @access  Public
exports.getBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get bootcamp by Id ${req.params.id}` });
};

// @route   POST api/v1/bootcamps
// @desc    Create a bootcamp
// @access  Private
exports.createBootcampAsync = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @route   PUT api/v1/bootcamps/:id
// @desc    Update bootcamp by Id
// @access  Private
exports.updateBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp by Id ${req.params.id}` });
};

// @route   DELETE api/v1/bootcamps/:id
// @desc    Delete bootcamp by Id
// @access  Private
exports.deleteBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp by Id ${req.params.id}` });
};
