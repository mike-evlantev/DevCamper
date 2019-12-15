const router = require("express").Router({ mergeParams: true }); // mergeParams: Preserve the req.params values from the parent router.
const {
  createCourseAsync,
  deleteCourseByIdAsync,
  getCoursesAsync,
  getCourseByIdAsync,
  updateCourseByIdAsync
} = require("../controllers/courses");
const collate = require("../middleware/collate");
const Course = require("../models/Course");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    collate(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCoursesAsync
  )
  .post(protect, createCourseAsync);
router
  .route("/:id")
  .get(getCourseByIdAsync)
  .put(protect, updateCourseByIdAsync)
  .delete(protect, deleteCourseByIdAsync);

module.exports = router;
