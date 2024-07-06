const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const connectedDB = require("./connection");

const PORT = 5000;

app.listen(PORT, async () => {
  try {
    await connectedDB();
    console.log(`server running on port ${PORT}`);
  } catch (err) {
    console.log("something went wrong ");
    process.exit(1);
  }
})