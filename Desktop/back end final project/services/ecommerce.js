const Product = require('../models/product');
const Cart = require('../models/cart');

class EcommerceService {
  
  // ==================== 1. خدمات المنتجات (Products Services) ====================

  // جلب كل المنتجات من قاعدة البيانات (عشان المستخدم والأدمن يشوفوها)
  async getAllProducts() {
    return await Product.find({});
  }

  // إضافة منتج جديد (خاصة بالأدمن Admin)
  async createProduct(productData) {
    return await Product.create(productData);
  }

  // حذف منتج نهائياً (خاصة بالأدمن Admin)
  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  }

  // تعديل بيانات منتج (خاصة بالأدمن Admin)
  async updateProduct(productId, updateData) {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true });
  }

  // ==================== 2. خدمات السلة (Cart Services) ====================

  // عرض محتويات السلة (مع جلب بيانات المنتجات كاملة باستخدام populate)
  async getCart() {
    // بنفترض إن عندنا سلة واحدة للمشروع كله تسهيلاً ليكي
    let cart = await Cart.findOne({}).populate('products.productId');
    if (!cart) {
      cart = await Cart.create({ products: [] });
    }
    return cart;
  }

  // إضافة منتج داخل السلة أو زيادة كميته (خاصة بالمستخدم User)
  async addToCart(productId, quantity = 1) {
    let cart = await Cart.findOne({});
    if (!cart) {
      cart = await Cart.create({ products: [] });
    }

    // التأكد إذا كان المنتج موجود مسبقاً في السلة
    const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (itemIndex > -1) {
      // لو المنتج موجود، زود الكمية
      cart.products[itemIndex].quantity += Number(quantity);
    } else {
      // لو مش موجود، ضيفه لأول مرة
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return await cart.populate('products.productId');
  }

  // حذف منتج تماماً من السلة
  async removeFromCart(productId) {
    let cart = await Cart.findOne({});
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    return await cart.populate('products.productId');
  }
}

// بنصدر نسخة جاهزة من الكلاس ده عشان نستخدمها علطول
module.exports = new EcommerceService();