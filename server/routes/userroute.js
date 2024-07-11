const express = require("express");
const {signup} = require("../controllers/usercontroller");
const {login} = require("../controllers/usercontroller");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").get(login);

module.exports = router;
