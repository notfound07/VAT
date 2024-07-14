const User = require("../model/userSchema");
const Feed = require("../model/feedSchema");
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


module.exports = { 
  signup,
  login,
  contact};