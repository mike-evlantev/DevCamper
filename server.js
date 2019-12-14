const express = require("express");
const path = require("path");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const errorHandler = require("./middleware/error");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Global Middleware
// Body Parser
app.use(express.json());
// Morgan logger (Dev logging middleware)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

// Mount Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
// Route Middleware
app.use(errorHandler);

// Connect to database
connectDb();

// Server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
