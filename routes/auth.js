const express = require("express");
const router = express.Router();

const {signup, signin} = require("../controllers/auth");
const {userSignUpValidator} = require("../validator")

router.post("/signup", userSignUpValidator, signup)
router.post("/signin", signin)

module.exports = router
