const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to E-Commerce API! السيرفر شغال وجاهز 🎉');
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('CONNECTED TO THE DATABASE SUCCESSFULLY... 🔌');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}... 🚀`);
    });
  } catch (error) {
    console.log('DATABASE CONNECTION ERROR:', error);
  }
};

start();