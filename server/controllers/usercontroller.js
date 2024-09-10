const User = require("../model/userSchema");
const Feed = require("../model/feedSchema");
const Order = require("../model/orderSchema");
const Booking = require("../model/bookingSchema");
const Product = require('../model/productSchema'); 
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: '../.env' });
const nodemailer = require("nodemailer");
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const { PassThrough } = require('stream');
const Bull = require('bull');
const productQueue = new Bull('productQueue', 'redis://127.0.0.1:6379');

ffmpeg.setFfmpegPath(ffmpegPath);

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
function sendEmail({ recipient_email, OTP }) {
  if (!recipient_email) {
    return Promise.reject({ message: "No recipient_email email provided" });
  }
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
        authMethod: 'PLAIN'
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "VAT PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Visionaryart Technology</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Visionaryart Technologies</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Visionaryart Technologies</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

const send_recovery_email=async (req, res) => {
  console.log("Request body received:", req.body); 

  console.log(process.env.MY_EMAIL);
  const { recipient_email, OTP } = req.body;
  
  if (!recipient_email) {
    return res.status(400).send("No recipient_email email provided");
  }

  sendEmail({ recipient_email, OTP })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
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

    if (!validator.isMobilePhone(phoneNumber)) {
      console.log("Validation error: Phone Number is invalid");
      return res.status(400).json({ message: "Phone Number is invalid" });
    }

    const newContact = await Feed.create({
      firstName,
      lastName,
      email:email,
      phoneNumber,
      commentMessage,
    });

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

const optimizeImageBuffer = async (imageBuffer) => {
  try {
    // Resize and compress image
    const optimizedBuffer = await sharp(imageBuffer)
      .resize(800, 600) // Resize to 800x600
      .jpeg({ quality: 80 }) // Compress and convert to JPEG
      .toBuffer();
    return optimizedBuffer;
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
};
const optimizeVideoBuffer = (videoBuffer) => {
  return new Promise((resolve, reject) => {
    const inputStream = new PassThrough();
    inputStream.end(videoBuffer);

    const outputStream = new PassThrough();
    const chunks = [];

    outputStream.on('data', (chunk) => chunks.push(chunk));
    outputStream.on('end', () => resolve(Buffer.concat(chunks)));

    ffmpeg()
      .input(inputStream)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions('-crf 23')
      .pipe(outputStream, { end: true })
      .on('error', (err) => reject(err));
  });
};
// const product = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({ message: "Title and description are required" });
//     }

//     if (!req.files || (!req.files.image && !req.files.video)) {
//       return res.status(400).json({ message: "At least one media file (image or video) is required" });
//     }

//     let image, video;
//     if (req.files.image) {
//       image = await optimizeImageBuffer(req.files.image[0].buffer);
//     }

//     if (req.files.video) {
//       video = await optimizeVideoBuffer(req.files.video[0].buffer);
//     }

//     const newProduct = new Product({
//       title,
//       description,
//       image: image
//         ? {
//             data: image,
//             contentType: req.files.image[0].mimetype,
//           }
//         : undefined,
//       video: video
//         ? {
//             data: video,
//             contentType: req.files.video[0].mimetype,
//           }
//         : undefined,
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error('Error creating product:', error.message);
//     res.status(500).json({ message: "Failed to create product" });
//   }
// };
productQueue.process(async (job) => {
  const { title, description, image, video } = job.data;
  try {
    let optimizedImage, optimizedVideo;
    
    if (image) {
      optimizedImage = await optimizeImageBuffer(image);
    }

    if (video) {
      optimizedVideo = await optimizeVideoBuffer(video);
    }

    const newProduct = new Product({
      title,
      description,
      image: optimizedImage
        ? {
            data: optimizedImage,
            contentType: 'image/jpeg',
          }
        : undefined,
      video: optimizedVideo
        ? {
            data: optimizedVideo,
            contentType: 'video/mp4',
          }
        : undefined,
    });

    return await newProduct.save();
  } catch (error) {
    throw new Error(`Failed to process product: ${error.message}`);
  }
});

const product = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    if (!req.files || (!req.files.image && !req.files.video)) {
      return res.status(400).json({ message: "At least one media file (image or video) is required" });
    }

    const image = req.files.image ? req.files.image[0].buffer : null;
    const video = req.files.video ? req.files.video[0].buffer : null;

    // Add job to queue
    await productQueue.add({
      title,
      description,
      image,
      video
    });

    res.status(202).json({ message: "Product processing started" });
  } catch (error) {
    console.error('Error creating product:', error.message);
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

const getById = async (req, res) => {
  try {
    const productById = await Product.findById(req.params.id);
    if (!productById) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product has a media key and generate a signed URL if it does
    if (productById.mediaKey) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: productById.mediaKey
      };

      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
          console.error('Error generating signed URL for media:', err);
          return res.status(500).json({ message: "Error generating media URL" });
        }

        // Attach the media URL to the product object
        productById.mediaUrl = url;
        res.json(productById);
      });
    } else {
      // No media key, return the product as is
      res.json(productById);
    }
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
  send_recovery_email,
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
