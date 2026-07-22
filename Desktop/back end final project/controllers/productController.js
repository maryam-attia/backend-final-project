const ecommerceService = require('../services/ecommerce');

// جلب كل المنتجات
const getAllProducts = async (req, res) => {
  try {
    const products = await ecommerceService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// إضافة منتج جديد (الأدمن)
const createProduct = async (req, res) => {
  try {
    const newProduct = await ecommerceService.createProduct(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// تعديل منتج (الأدمن)
const updateProduct = async (req, res) => {
  try {
    const updated = await ecommerceService.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// حذف منتج (الأدمن)
const deleteProduct = async (req, res) => {
  try {
    const deleted = await ecommerceService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    res.status(200).json({ success: true, message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};