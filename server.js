const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcamps = require("./routes/bootcamps");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/bootcamps", bootcamps);

// Server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
