const mongoose = require('mongoose');
const URL = "mongodb+srv://alisbahhina:fgsFFdhKne5F3BRV@cluster0.7vmoebe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDb() {
        return mongoose.connect(URL);
}
module.exports = connectDb;