const User = require("../model/userSchema");
const Feedback = require("../model/feedbackSchema");
const Submission = require("../model/datasubmission");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

/*  function to login:

status:
200: user found , returns the data of the current user,
400: for bad request , if email or password is missing,
401: unauthorized: if the email and paswword does not match

*/

const login = async (req, res) => {
    try {
        const { email, password } = req.query;

        // Validating if the email and the password exist
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Finding user for the given email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "No user found for this email" });
        }

        // Comparing the password
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ email: user.email, id: user.id }, "test", { expiresIn: "1h" });

        // Sending the response with the user data and the token
        return res.status(200).json({ result: user, token });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


reset_password = async (req, res) => {
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


        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        if (!validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            return res.status(400).json({ message: "Password must be exactly 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number" });
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


/* function to sign up for a new customer

@param:
    name: string,
    email: string,
    password: string,

status:

    400: bad request , if any of the param is missing,
    409: if there is already a user with the email or the rollNo.\
    500: internal server error.
*/

const signup = async (req, res) => {
    try {
        const { name, email, username, password, confirmpassword } = req.body;

        //validating the user data.
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        if (!confirmpassword) {
            return res.status(400).json({ message: "Confirm password is required" });
        }
        //password validation
        if (!validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            return res.status(400).json({ message: "Password must be exactly 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number" });
        }

       // Normalize email to lowercase
       const normalizedEmail = email.toLowerCase().trim();

       // Check for duplicate email
       const duplicateEmail = await User.findOne({ emailID: normalizedEmail });
       if (duplicateEmail) {
           return res.status(401).json({ message: "This email has already been used" });
       }

        const encryptedPassword = await bcrypt.hash(password, 10);

        // checking password
        if (password != confirmpassword) {
            return res
                .status(400)
                .json({ message: "Password doesn't match" });
        }

        const newUser = await User.create({
            name,
            username,
            email: normalizedEmail,
            password: encryptedPassword,
            confirmpassword: encryptedPassword,
        });

        if (newUser) {
            return res.status(201).json({ message: "User registered successfully", user: newUser });
        }
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            return res.status(409).json({ message: "This email has already been used" });
        }
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

};
const feedback = async (req, res) => {
    try {
        const { name, email, msg } = req.body;

        //validating the user data.
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!msg) {
            return res.status(400).json({ message: "Message is required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const newUserFeedback = await Feedback.create({
            name,
            email: email,
            msg,
        });

        if (newUserFeedback) {
            return res.status(201).json(newUserFeedback);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};
//getting feedback from database
const Allfeedbacks = async (req, res) => {
    try {
        const feedbackResponses = await Feedback.find();
        res.status(200).json(feedbackResponses);
    } catch (error) {
        console.error("Error fetching feedback responses:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//posting data to database
const booking = async (req, res) => {
    try {
        const { OrderId,Restraunt,BranchName,UserEmail, Seat,id, item,time,date,contact } = req.body;

        //validating the user data.
        if (!OrderId) {
            return res.status(400).json({ message: "Auto generated" });
        }
        if (!Restraunt) {
            return res.status(400).json({ message: "Select restraunt" });
        }
        if (!BranchName) {
            return res.status(400).json({ message: "Select branch" });
        }
        if (!UserEmail) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!Seat) {
            return res.status(400).json({ message: "Seat is required" });
        }
        if (!id) {
            return res.status(400).json({ message: "Seat id  is required" });
        }
        if (!item) {
            return res.status(400).json({ message: "Items are required" });
        }
        if (!time) {
            return res.status(400).json({ message: "Time is required" });
        }
        if (!date) {
            return res.status(400).json({ message: "Date are required" });
        }
        if (!contact) {
            return res.status(400).json({ message: "Contact are required" });
        }

        const newReservation = await Submission.create({
            OrderId,
            Restraunt,
            BranchName,
            UserEmail,
            Seat,
            id,
            item,
            time,
            date,
            contact,
        });

        if (newReservation) {
            return res.status(201).json(newReservation);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};
//getting submits from database
const Allrecords = async (req, res) => {
    try {
        const RecordResponses = await Submission.find();
        res.status(200).json(RecordResponses);
    } catch (error) {
        console.error("Error fetching record responses:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    login,
    signup,
    reset_password,
    feedback,
    Allfeedbacks,
    booking,
    Allrecords,
};