const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config({ path: './.env' });
require('dotenv').config({path:'./aws.env'});
const compression = require('compression');


  
app.use(cors());
app.use(bodyParser.json());

app.use(compression({
    threshold: 1024,
    level: 3, // Only compress responses larger than 1KB
  }));
 
const connectedDB = require("./connection");
const userroute = require("./routes/userroute");

app.use("/vat", userroute);


app.get("/", (req, res) => {
  console.log(process.env.MY_EMAIL);
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