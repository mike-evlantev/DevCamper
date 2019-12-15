const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"]
  },
  description: {
    type: String,
    require: [true, "Please add a description"]
  },
  weeks: {
    type: String,
    require: [true, "Please add number of weeks"]
  },
  tuition: {
    type: Number,
    require: [true, "Please add cost of tuition"]
  },
  minimumSkill: {
    type: String,
    require: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    require: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true
  }
});

// Static method (called on the model: Course.getAverageCost)
// Writes avg cost of tuitions to DB
CourseSchema.statics.gerAverageCost = async function(bootcampId) {
  const aggregate = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    { $group: { _id: "$bootcamp", averageCost: { $avg: "$tuition" } } }
  ]);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(aggregate[0].averageCost / 10) * 10 // /10*10 gives an integer
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageCost after save
CourseSchema.post("save", function() {
  this.constructor.gerAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
CourseSchema.pre("remove", function() {
  this.constructor.gerAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
