const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const wishlistRoutes = require('./routes/wishlistRoutes');


connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added to help with FormData parsing

// Basic Route
app.get('/', (req, res) => {
  res.send('NovanOfficial Backend API is Live...');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);


app.get('/', (req, res) => {
  res.send('NovanOfficial Backend API is Live...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const axios = require('axios');

// const keepAlive = () => {
//   const url = `https://novanofficialapi.onrender.com/`; 
//   setInterval(async () => {
//     try {
//       await axios.get(url);
//       console.log('Keep-alive ping sent successfully');
//     } catch (error) {
//       console.error('Keep-alive ping failed:', error.message);
//     }
//   }, 600000); // 10 minutes in milliseconds
// };

// keepAlive();