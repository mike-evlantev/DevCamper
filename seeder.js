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
const User = require("./models/User");
const Review = require("./models/Review");

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

// Import into DB
const importDataAsync = async () => {
  try {
    const bootcampResults = await Bootcamp.create(bootcamps);
    const courseResults = await Course.create(courses);
    const userResults = await User.create(users);
    const reviewResults = await Review.create(reviews);
    console.log(`Imported ${bootcampResults.length} bootcamps`);
    console.log(`Imported ${courseResults.length} courses`);
    console.log(`Imported ${userResults.length} users`);
    console.log(`Imported ${reviewResults.length} reviews`);
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
    const userResults = await User.deleteMany();
    const reviewResults = await User.deleteMany();
    console.log(`Destroyed ${bootcampResults.deletedCount} bootcamps`);
    console.log(`Destroyed ${courseResults.deletedCount} courses`);
    console.log(`Destroyed ${userResults.deletedCount} users`);
    console.log(`Destroyed ${reviewResults.deletedCount} users`);
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
