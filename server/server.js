const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config({ path: './.env' });
const nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.json());

const connectedDB = require("./connection");
const userroute = require("./routes/userroute");

app.use("/vat", userroute);

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

app.get("/", (req, res) => {
  console.log(process.env.MY_EMAIL);
});

app.post("/send_recovery_email", (req, res) => {
  console.log("Request body received:", req.body); 

  const { recipient_email, OTP } = req.body;
  
  if (!recipient_email) {
    return res.status(400).send("No recipient_email email provided");
  }

  sendEmail({ recipient_email, OTP })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

const PORT = 3001;
app.listen(PORT, 'localhost', async () => {
    try {
        await connectedDB();
        console.log(`Server running on port ${PORT}`);
    } catch (err) {
        console.log("Something went wrong");
        process.exit(1);
    }
});