const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  items: [
    {
      id: Number,
      title: String,
      image: {
        data: Buffer,
        contentType: String,
      },
      description: String,
    },
  ],
  });

Booking=mongoose.model("booking",bookingSchema);

module.exports=Booking;