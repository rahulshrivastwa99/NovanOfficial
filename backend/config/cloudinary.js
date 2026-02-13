const cloudinary = require('cloudinary'); // full instance, not .v2
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary v2 API on the full instance
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// For debugging env issues (optional – can be removed later)
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
    // eslint-disable-next-line no-console
    console.warn(
      '[Cloudinary] Missing env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET'
    );
  }
}

// For multer-storage-cloudinary@2.x, the default export is a factory function,
// not a class constructor. Call it directly instead of `new CloudinaryStorage(...)`.
const storage = cloudinaryStorage({
  cloudinary, // pass the full instance so `.v2` exists inside the library
  folder: 'novan_products',
  allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
  transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };