const router = require("express").Router({ mergeParams: true }); // mergeParams: Preserve the req.params values from the parent router.
const {
  getCoursesAsync,
  getCourseByIdAsync
} = require("../controllers/courses");

router.route("/").get(getCoursesAsync);
router.route("/:id").get(getCourseByIdAsync);

module.exports = router;
