import { Router } from "express";
import {
  createCart,
  getCartById,
  deleteProductFromCart,
  updateCart,
  updateProductQuantity,
  clearCart
} from "../controllers/carts.controller.js";

const router = Router();

// 🛒 Crear nuevo carrito
router.post("/", createCart);

// 🔍 Obtener carrito con populate
router.get("/:cid", getCartById);

// ❌ Eliminar producto específico del carrito
router.delete("/:cid/products/:pid", deleteProductFromCart);

// 🔁 Actualizar TODOS los productos del carrito
router.put("/:cid", updateCart);

// 🔢 Actualizar SOLO cantidad de un producto
router.put("/:cid/products/:pid", updateProductQuantity);

// 🧹 Vaciar carrito completo
router.delete("/:cid", clearCart);

export default router;