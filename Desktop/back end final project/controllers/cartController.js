const ecommerceService = require('../services/ecommerce');

// عرض محتويات السلة
const getCart = async (req, res) => {
  try {
    const cart = await ecommerceService.getCart();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// إضافة منتج للسلة (المستخدم)
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'يجب إدخال الـ ID الخاص بالمنتج' });
    }
    const updatedCart = await ecommerceService.addToCart(productId, quantity);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// حذف منتج من السلة
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // الـ ID بتاع المنتج اللي هنحذفه من السلة
    const updatedCart = await ecommerceService.removeFromCart(id);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};