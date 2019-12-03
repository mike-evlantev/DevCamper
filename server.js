const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcamps = require("./routes/bootcamps");
const errorHandler = require("./middleware/error");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Global Middleware
// Body Parser
app.use(express.json());
// Morgan logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/bootcamps", bootcamps);
// Route Middleware
app.use(errorHandler);

// Connect to database
connectDb();

// Server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
