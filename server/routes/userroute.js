const express = require("express");
const { signup, login, contact, order,booking } = require("../controllers/usercontroller");
const router = express.Router();
// Set up multer for file uploads

router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/contact").post(contact);
router.route("/order").post(order);
router.route("/booking").post(booking);

module.exports = router;
