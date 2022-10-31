const express = require("express");
const { login, register, verify, auth } = require("../../../controller");
const validate = require("../../../middleware/validate");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verify);
router.get("/me", validate, auth);

module.exports = router;
