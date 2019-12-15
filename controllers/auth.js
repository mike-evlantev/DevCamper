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
  // Create token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

// @route   POST api/v1/auth/login
// @desc    Login a user
// @access  Public
exports.loginAsync = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provider and email and password", 400)
    );
  }
  // Check for user
  const user = await User.findOne({ email }).select("+password"); // returns user object with password
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Create token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
