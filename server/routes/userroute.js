const express = require("express");
const { signup, login, contact } = require("../controllers/usercontroller");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/contact").post(contact);

module.exports = router;
