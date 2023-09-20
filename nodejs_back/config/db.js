const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
