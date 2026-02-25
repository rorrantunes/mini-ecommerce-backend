import { CartModel as Cart } from "../models/cart.model.js";

// 🛒 Crear carrito
export const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// 🔍 Obtener carrito con populate
export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// ❌ Eliminar producto del carrito
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== pid);

    await cart.save();
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// 🔁 Actualizar todos los productos del carrito
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// 🔢 Actualizar cantidad de un producto
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === pid
    );

    if (productIndex === -1) {
      return res.status(404).json({
        status: "error",
        error: "Producto no está en el carrito"
      });
    }

    cart.products[productIndex].quantity = quantity;

    await cart.save();
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// 🧹 Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = [];
    await cart.save();

    res.json({ status: "success", message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};