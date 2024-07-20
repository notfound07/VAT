const User = require("../model/userSchema");
const Feed = require("../model/feedSchema");
const Order = require("../model/orderSchema");
const Booking=require("../model/bookingSchema");
const Product = require('../model/productSchema'); 
const validator = require("validator");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Full Name is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!confirmpassword) {
      return res.status(400).json({ message: "Confirm Password is required" });
    }

    const duplicateEmail = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (duplicateEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (
      !validator.matches(
        password,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      return res.status(400).json({ message: "Password is invalid" });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.query; // Retrieve email and password from query parameters
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    const user = await User.findOne({ email });
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const contact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, commentMessage } = req.body;

    if (!firstName) {
      return res.status(400).json({ message: "First Name is required" });
    }

    if (!lastName) {
      return res.status(400).json({ message: "Last Name is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone Number is required" });
    }

    if (!commentMessage) {
      return res.status(400).json({ message: "Comment Message is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (!validator.isMobilePhone(phoneNumber)) {
      return res.status(400).json({ message: "Phone Number is invalid" });
    }

    const newContact = await Feed.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      commentMessage
    });

    res.status(201).json({ message: "Contact form submitted successfully", data: newContact });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const order = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, pin } = req.body;

    if (!firstName) {
      return res.status(400).json({ message: "First Name is required" });
    }
    if (!lastName) {
      return res.status(400).json({ message: "Last Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone Number is required" });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    if (!pin) {
      return res.status(400).json({ message: "Pin is required" });
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
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
const booking = async (req, res) => {
  try {
    const { items } = req.body;
    const newOrder = new Booking({ items });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }

};
const product= async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newProduct = new Product({
      title,
      description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};
module.exports = {
  signup,
  login,
  contact,
  order,
  booking,
  product,
  getAllProducts
};
