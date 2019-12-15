const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

// @route   POST api/v1/auth/register
// @desc    Register a user
// @access  Public
exports.registerAsync = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // Create User
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  res.status(200).json({ success: true });
});
