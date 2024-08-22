const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  video: { // Add video field
    data: Buffer,
    contentType: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

