const User = require("../model/userSchema");
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
module.exports = { signup };
