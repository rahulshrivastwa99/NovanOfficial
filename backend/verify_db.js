const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const checkImages = async () => {
    try {
        const products = await Product.find().limit(5);
        console.log("--- Checking First 5 Products ---");
        products.forEach(p => {
            console.log(`Product: ${p.name}`);
            console.log(`Images:`, p.images);
            console.log(`Colors:`, p.colors);
        });
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkImages();
