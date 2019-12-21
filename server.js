const express = require("express");
const path = require("path");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const auth = require("./routes/auth");
const errorHandler = require("./middleware/error");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Global Middleware
// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookieParser());
// Morgan logger (Dev logging middleware)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileUpload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Security
app.use(mongoSanitize()); // Sanitize data
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent cross site scripting
app.use(hpp()); // Prevent http param pollution
app.use(cors()); // Enable CORS

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter); // Limits repeated requests

// Mount Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
// Route Middleware
app.use(errorHandler);

// Connect to database
connectDb();

// Server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// https://documenter.getpostman.com/view/310625/SWLYAAXm?version=latest
