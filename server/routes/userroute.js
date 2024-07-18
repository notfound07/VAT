const express = require("express");
const { signup, login, contact, order } = require("../controllers/usercontroller");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/contact").post(contact);
router.route("/order").post(order);

module.exports = router;
