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
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create a bootcamp" });
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
