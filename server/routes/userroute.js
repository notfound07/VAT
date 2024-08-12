const express = require("express");
const { signup, login, contact,getAllcontacts,order,booking,Allbooking,product,update_product,getAllProducts,getById,deleteById,media } = require("../controllers/usercontroller");
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/contact").post(contact);
router.route("/getAllcontacts").get(getAllcontacts);
router.route("/order").post(order);
router.route("/booking").post(booking);
router.route('/allBooking').get(Allbooking);
router.post('/product', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), product);  
router.route('/updateproduct/:id').put(update_product);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getById/:id").get(getById);
router.route("/deleteById/:id").delete(deleteById);
router.route("/media").get(media);
module.exports = router;
