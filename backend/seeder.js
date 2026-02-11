const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear the database
    await Product.deleteMany();

    // 2. Insert your product.ts data
    await Product.insertMany(products);

    console.log('✨ NovanOfficial: Data Imported to MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with import: ${error.message}`);
    process.exit(1);
  }
};

// To run this, type 'node seeder.js' in your terminal
importData();