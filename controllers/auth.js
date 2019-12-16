const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");

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
  sendTokenResponse(user, 200, res);
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
  sendTokenResponse(user, 200, res);
});

// @route   GET api/v1/auth/me
// @desc    Get current logged in user
// @access  Private
exports.getMeAsync = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// @route   GET api/v1/auth/forgotpassword
// @desc    Forgot password
// @access  Public
exports.forgotPasswordAsync = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  // Save to Db
  await user.save({ validateBeforeSave: false });
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;
  // Create message
  const msg = {
    to: "mikeev21@gmail.com",
    from: "noreply@example.org",
    subject: "Hello world",
    text: `PUT: ${resetUrl}`,
    html: `PUT: ${resetUrl}`
  };
  try {
    sendEmail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // Save to Db
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Failed to send email", 500));
  }
});

// @route   PUT api/v1/auth/resetpassword/:resetToken
// @desc    Reset password
// @access  Public
exports.resetPasswordAsync = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  // Get user by reset token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }
  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// @route   PUT api/v1/auth/updatepassword
// @desc    Update password
// @access  Private
exports.updatePasswordAsync = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("User not found", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  // Options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  // Option for Production
  if (process.env.NODE_ENV === "production") {
    options.secure = true; //uses https
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
