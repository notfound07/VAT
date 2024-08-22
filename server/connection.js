const mongoose = require('mongoose');
const URL = "mongodb+srv://alisbahhina:XLIBbcIE0dsWDsSp@cluster0.rd3md3x.mongodb.net/";

async function connetDb() {

        return mongoose.connect(URL);
        console.log("connected to database");

}

module.exports = connetDb;