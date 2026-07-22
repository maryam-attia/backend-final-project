const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'يجب إدخال اسم المنتج'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'يجب إدخال سعر المنتج']
  },
  description: {
    type: String,
    required: [true, 'يجب إدخال وصف المنتج']
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'عام'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);