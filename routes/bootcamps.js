const router = require("express").Router();

// @route   GET api/v1/bootcamps
// @desc    Get all bootcamps
// @access  Public
router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Get all bootcamps" });
});

// @route   GET api/v1/bootcamps
// @desc    Get bootcamp by Id
// @access  Public
router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Get bootcamp by Id ${req.params.id}` });
});

// @route   POST api/v1/bootcamps
// @desc    Create a bootcamp
// @access  Public
router.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Create a bootcamp" });
});

// @route   PUT api/v1/bootcamps
// @desc    Update bootcamp by Id
// @access  Public
router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp by Id ${req.params.id}` });
});

// @route   DELETE api/v1/bootcamps
// @desc    Delete bootcamp by Id
// @access  Public
router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp by Id ${req.params.id}` });
});

module.exports = router;
