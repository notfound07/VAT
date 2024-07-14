const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    commentMessage: { type: String, required: true },
});

Feed = mongoose.model("feed", feedSchema);

module.exports = Feed;
