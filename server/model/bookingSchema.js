const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      image: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
  });

Booking=mongoose.model("booking",bookingSchema);

module.exports=Booking;