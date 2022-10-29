const express = require("express");
const { login, register } = require("../../../controller");

const router = express.Router();

router.post("/register", register);

module.exports = router;
