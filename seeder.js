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

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import into DB
const importDataAsync = async () => {
  try {
    const result = await Bootcamp.create(bootcamps);
    console.log(`Imported ${result.length} documents`);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete from DB
const deleteDataAsync = async () => {
  try {
    const result = await Bootcamp.deleteMany();
    console.log(`Destroyed ${result.deletedCount} documents`);
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
