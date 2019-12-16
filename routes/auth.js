const router = require("express").Router();
const { protect } = require("../middleware/auth");
const {
  registerAsync,
  loginAsync,
  getMeAsync,
  forgotPasswordAsync,
  resetPasswordAsync
} = require("../controllers/auth");

router.route("/register").post(registerAsync);
router.route("/login").post(loginAsync);
router.route("/me").get(protect, getMeAsync);
router.route("/forgotpassword").post(forgotPasswordAsync);
router.route("/resetpassword/:resetToken").put(resetPasswordAsync);

module.exports = router;
