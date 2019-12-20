const router = require("express").Router();
const { protect } = require("../middleware/auth");
const {
  registerAsync,
  loginAsync,
  logout,
  getMeAsync,
  forgotPasswordAsync,
  resetPasswordAsync,
  updatePasswordAsync
} = require("../controllers/auth");

router.route("/register").post(registerAsync);
router.route("/login").post(loginAsync);
router.route("/logout").get(protect, logout);
router.route("/me").get(protect, getMeAsync);
router.route("/forgotpassword").post(forgotPasswordAsync);
router.route("/resetpassword/:resetToken").put(resetPasswordAsync);
router.route("/updatepassword").put(protect, updatePasswordAsync);

module.exports = router;
