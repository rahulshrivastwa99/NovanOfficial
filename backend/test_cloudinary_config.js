const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

console.log('CloudinaryStorage type:', typeof CloudinaryStorage);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary config:', cloudinary.config());

try {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'novan-products',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
  });
  console.log('Storage initialized successfully:', storage);
} catch (error) {
  console.error('Error initializing storage:', error);
}
