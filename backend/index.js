const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('NovanOfficial Backend API is Live...');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));