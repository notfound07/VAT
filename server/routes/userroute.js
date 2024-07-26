const express = require("express");
const { signup, login, contact, order,booking,Allbooking,product,update_product,getAllProducts,getById } = require("../controllers/usercontroller");
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/contact").post(contact);
router.route("/order").post(order);
router.route("/booking").post(booking);
router.route('/allBooking').get(Allbooking);
router.post('/product', upload.single('image'), product);
router.route('/updateproduct/:id').put(update_product);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getById/:id").get(getById);

module.exports = router;
