const express = require("express");
const dotenv = require("dotenv");

// Routes
const bootcamps = require("./routes/bootcamps");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use("/api/v1/bootcamps", bootcamps);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
