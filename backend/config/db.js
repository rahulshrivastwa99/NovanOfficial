const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This uses the MONGO_URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      tls: true, // Ensure SSL is used
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;