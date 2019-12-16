const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

// @route   GET api/v1/users
// @desc    Get all users
// @access  Private (Admin)
exports.getUsersAsync = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.collate);
});

// @route   GET api/v1/users/:id
// @desc    Get user by id
// @access  Private (Admin)
exports.getUserByIdAsync = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json({ success: true, data: user });
});

// @route   POST api/v1/users
// @desc    Create a user
// @access  Private (Admin)
exports.createUserAsync = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// @route   PUT api/v1/users/:id
// @desc    Update user by id
// @access  Private (Admin)
exports.updateUserByIdAsync = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({ success: true, data: user });
});

// @route   DELETE api/v1/users/:id
// @desc    Delete user by id
// @access  Private (Admin)
exports.deleteUserByIdAsync = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
