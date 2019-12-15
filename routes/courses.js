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
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    collate(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCoursesAsync
  )
  .post(protect, authorize("publisher", "admin"), createCourseAsync);
router
  .route("/:id")
  .get(getCourseByIdAsync)
  .put(protect, authorize("publisher", "admin"), updateCourseByIdAsync)
  .delete(protect, authorize("publisher", "admin"), deleteCourseByIdAsync);

module.exports = router;
