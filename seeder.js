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

const createResource = async (model, data) => {
  const results = await model.create(data);
  console.log(`Imported ${results.length} ${model.modelName}s`);
};

const deleteResource = async model => {
  const results = await model.deleteMany();
  console.log(`Destroyed ${results.deletedCount} ${model.modelName}s`);
};

// Import into DB
const importDataAsync = async () => {
  try {
    await createResource(Bootcamp, bootcamps);
    await createResource(Course, courses);
    await createResource(User, users);
    await createResource(Review, reviews);

    process.exit();
  } catch (error) {
    console.error(error);
    console.log("Process terminated.");
    process.exit();
  }
};

// Delete from DB
const deleteDataAsync = async () => {
  try {
    await deleteResource(Bootcamp);
    await deleteResource(Course);
    await deleteResource(User);
    await deleteResource(Review);

    process.exit();
  } catch (error) {
    console.error(error);
    console.log("Process terminated.");
    process.exit();
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
