const mongoose = require('mongoose');
require('dotenv').config();

// 1. استدعاء موديل المنتجات (تأكدي من مسار ملف الـ Product Model عندك)
const Product = require('../models/Product'); // لو الموديل في مكان تاني غيري المسار

// 2. بيانات منتجات تجريبية
const sampleProducts = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    description: "High quality wireless headphones with noise cancellation.",
    category: "Electronics"
  },
  {
    name: "Smart Watch",
    price: 149.99,
    description: "Track your fitness and health metrics daily.",
    category: "Electronics"
  },
  {
    name: "Running Shoes",
    price: 79.99,
    description: "Comfortable athletic shoes for daily running.",
    category: "Footwear"
  }
];

// 3. الاتصال وإدخال البيانات
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // مسح المنتجات القديمة (اختياري)
    await Product.deleteMany({});
    
    // إدخال المنتجات الجديدة
    await Product.insertMany(sampleProducts);
    console.log("SUCCESS: Sample Data Seeded Successfully! 🎉");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();