const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  pin: { type: String, required: true },
});

Order = mongoose.model("order", orderSchema);

module.exports = Order;
