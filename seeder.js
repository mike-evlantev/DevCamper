const fs = require("fs");
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const asyncHandler = require("./middleware/async");
const dotenv = require("dotenv");
dotenv.config();

// Connect to DB
connectDb();

// Load models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import into DB
const importDataAsync = async () => {
  try {
    const bootcampResults = await Bootcamp.create(bootcamps);
    const courseResults = await Course.create(courses);
    console.log(`Imported ${bootcampResults.length} bootcamps`);
    console.log(`Imported ${courseResults.length} courses`);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete from DB
const deleteDataAsync = async () => {
  try {
    const bootcampResults = await Bootcamp.deleteMany();
    const courseResults = await Course.deleteMany();
    console.log(`Destroyed ${bootcampResults.deletedCount} bootcamps`);
    console.log(`Destroyed ${courseResults.deletedCount} courses`);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importDataAsync();
} else if (process.argv[2] === "-d") {
  deleteDataAsync();
} else {
  console.log("Unrecognized command. Process terminated.");
  process.exit();
}
