const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Sets auth header value 'Bearer <token>' to array ['Bearer', <token>]
    // and grabs the <token> ([1])
    token = req.headers.authorization.split(" ")[1];
    // } else if (req.cookies.token) {
    //   token = req.cookies.token
  }
  // Ensure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access route", 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access route", 401));
  }
});

// Role-based authorization
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse("Not authorized to access route", 403));
    }
    next();
  };
};
