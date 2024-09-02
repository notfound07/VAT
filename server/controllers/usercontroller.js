const User = require("../model/userSchema");
const Feed = require("../model/feedSchema");
const Order = require("../model/orderSchema");
const Booking = require("../model/bookingSchema");
const Product = require('../model/productSchema'); 
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key";

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (!validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_.@]{9,}$/)) {
      return res.status(400).json({ message: "Password must be more than 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number" });
  }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token , role: user.role });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
const reset_password = async (req, res) => {
  const { email, password, confirmpassword } = req.body;
  try {
      if (!email) {
          return res.status(400).json({ message: "Email is required" });
      }
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (!password || !confirmpassword) {
          return res.status(400).json({ message: "Both password and confirm password are required" });
      }

      if (password !== confirmpassword) {
          return res.status(400).json({ message: "Passwords don't match" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_.@]{9,}$/)) {
        return res.status(400).json({ message: "Password must be more than 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number" });
    }

    // Update user's password in the database
    await User.updateOne({ email }, { $set: { password: hashedPassword, confirmpassword: hashedPassword } });

    // Respond with success message
    res.status(200).json({ message: 'Password reset successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
}

const contact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, commentMessage } = req.body;

    // Log the received data
    console.log("Received data:", req.body);

    if (!firstName || !lastName || !email || !phoneNumber || !commentMessage) {
      console.log("Validation error: All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      console.log("Validation error: Email is invalid");
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (!validator.isMobilePhone(phoneNumber)) {
      console.log("Validation error: Phone Number is invalid");
      return res.status(400).json({ message: "Phone Number is invalid" });
    }

    const newContact = new Feed({
      firstName,
      lastName,
      email,
      phoneNumber,
      commentMessage,
    });

    await newContact.save();
    console.log("Contact form saved successfully:", newContact);
    res.status(201).json({ message: "Contact form submitted successfully", data: newContact });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



const getAllcontacts = async (req, res) => {
  try {
    const allcontacts = await Feed.find();
    res.status(200).json(allcontacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const order = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, pin } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !address || !pin) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (!validator.isMobilePhone(phoneNumber)) {
      return res.status(400).json({ message: "Phone Number is invalid" });
    }

    const newOrder = await Order.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      pin
    });

    res.status(201).json({ message: "Order submitted successfully", data: newOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const booking = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    const newOrder = new Booking({ items });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const Allbooking = async (req, res) => {
  try {
    const allBooking = await Booking.find();
    res.status(200).json(allBooking);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


const product = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Check if at least one media file (image or video) is provided
    if (!req.files || (!req.files.image && !req.files.video)) {
      return res.status(400).json({ message: "At least one media file (image or video) is required" });
    }

    // Construct the product object
    const newProduct = new Product({
      title,
      description,
      image: req.files.image
        ? {
            data: req.files.image[0].buffer,
            contentType: req.files.image[0].mimetype,
          }
        : undefined,
      video: req.files.video
        ? {
            data: req.files.video[0].buffer,
            contentType: req.files.video[0].mimetype,
          }
        : undefined,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const media = async (req, res) => {
  const { type } = req.query;

  try {
    let media;
    if (type === 'image') {
      media = await Product.find({ 'image.data': { $exists: true } }, 'title description image');
    } else if (type === 'video') {
      media = await Product.find({ 'video.data': { $exists: true } }, 'title description video');
    } else {
      media = await Product.find({}, 'title description image video'); // Fetch all products with their media
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update_product = async (req, res) => {
  try {
    const { title, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title;
    product.description = description;
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

//details
const getById = async (req, res) => {
  try {
    const productbyid = await Product.findById(req.params.id);
    if (!productbyid) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(productbyid);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  reset_password,
  contact,
  getAllcontacts,
  order,
  booking,
  Allbooking,
  product,
  update_product,
   getAllProducts,
  getById,
  deleteById,
  media
};
