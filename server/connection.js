const mongoose = require('mongoose');

const URL = "mongodb+srv://alisbahhina:fgsFFdhKne5F3BRV@cluster0.7vmoebe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  try {
    await mongoose.connect(URL); // Removed deprecated options
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error', err);
    throw err;
  }
};

module.exports = connectDb;

// const mongoose = require('mongoose');
// const URL = "mongodb+srv://alisbahhina:fgsFFdhKne5F3BRV@cluster0.7vmoebe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const connectDb = async () => {
//   try {
//     await mongoose.connect(URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Database connected');
//   } catch (err) {
//     console.error('Database connection error', err);
//     throw err;
//   }
// };

// module.exports = connectDb;
