const express = require("express");
const {
  login,
  register,
  verify,
  auth,
  googleLogin,
} = require("../../../controller");
const validate = require("../../../middleware/validate");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verify);
router.get("/me", validate, auth);
router.post("/google", googleLogin);

module.exports = router;
