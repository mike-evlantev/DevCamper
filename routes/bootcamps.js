const router = require("express").Router();
const {
  getBootcamps,
  getBootcampById,
  createBootcampAsync,
  updateBootcampById,
  deleteBootcampById
} = require("../controllers/bootcamps");

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcampAsync);

router
  .route("/:id")
  .get(getBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

module.exports = router;
