const router = require("express").Router({ mergeParams: true }); // mergeParams: Preserve the req.params values from the parent router.
const { getCoursesAsync } = require("../controllers/courses");

router.route("/").get(getCoursesAsync);

module.exports = router;
