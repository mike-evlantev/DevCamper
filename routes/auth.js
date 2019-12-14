const router = require("express").Router();
const { registerAsync } = require("../controllers/auth");

router.route("/register").post(registerAsync);

module.exports = router;
