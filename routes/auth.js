const router = require("express").Router();
const { registerAsync, loginAsync } = require("../controllers/auth");

router.route("/register").post(registerAsync);
router.route("/login").post(loginAsync);

module.exports = router;
