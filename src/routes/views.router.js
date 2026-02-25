import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

// 🧪 TEST
router.get("/views-test", (req, res) => {
  res.send("VIEWS ROUTER OK");
});

// 🛍 Productos
router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find().lean();
    res.render("index", { products });
  } catch (error) {
    res.status(500).send("Error cargando productos");
  }
});

// 🛒 Carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid)
      .populate("products.product")
      .lean();

    if (!cart) return res.status(404).send("Carrito no encontrado");

    res.render("cart", { cart });
  } catch (error) {
    res.status(500).send("Error cargando carrito");
  }
});

export default router;