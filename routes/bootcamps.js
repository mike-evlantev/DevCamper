const router = require("express").Router();
const {
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById
} = require("../controllers/bootcamps");

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

module.exports = router;
