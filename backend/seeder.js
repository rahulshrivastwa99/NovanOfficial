const path = require('path');
const dotenv = require('dotenv');

// Check if .env is in backend or root
dotenv.config({ path: path.join(__dirname, '.env') }); 

// Debugging
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not Set");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Not Set");

const mongoose = require('mongoose');
const fs = require('fs');
const products = require('./data/products');
const Product = require('./models/Product');
const connectDB = require('./config/db');
const { cloudinary } = require('./config/cloudinary');

connectDB();

const importData = async () => {
  try {
    // 1. Clear the database
    await Product.deleteMany();
    console.log('🧹 Database cleared.');

    // 2. Upload images to Cloudinary and update product data
    console.log('🚀 Starting Cloudinary migration...');
    
    const updatedProducts = await Promise.all(products.map(async (product) => {
      const newImages = await Promise.all(product.images.map(async (imagePath) => {
        // imagePath is like "/images/foo.jpg"
        // Local path: ../Frontend/public/images/foo.jpg
        
        // Remove leading slash if present
        const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        const localPath = path.join(__dirname, '../Frontend/public', cleanPath);

        if (fs.existsSync(localPath)) {
            // Check if it's already a URL (in case of re-run or mixed data)
            if (imagePath.startsWith('http')) return imagePath;

            try {
                const result = await cloudinary.v2.uploader.upload(localPath, {
                    folder: 'novan_products',
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                });
                console.log(`✅ Uploaded: ${cleanPath}`);
                return result.secure_url;
            } catch (uploadError) {
                console.error(`❌ Cloudinary Upload Failed for ${cleanPath}:`, uploadError.message);
                return imagePath; // Fallback to local path
            }
        } else {
            console.warn(`⚠️ Local file not found: ${localPath}`);
            return imagePath; 
        }
      }));
      
      return { ...product, images: newImages };
    }));

    // 3. Insert updated data
    await Product.insertMany(updatedProducts);

    console.log('✨ NovanOfficial: Data Imported to MongoDB with Cloudinary Images!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('🧨 Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}