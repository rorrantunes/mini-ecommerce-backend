import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";

const router = Router();

// 🧪 TEST ROUTE (debug)
router.get("/test", (req, res) => {
  res.send("ROUTE PRODUCTS OK ✅");
});

//  GET con filtros, paginación, sort, query
router.get("/", getProducts);

//  GET producto por ID
router.get("/:pid", getProductById);

//  Crear producto
router.post("/", createProduct);

//  Actualizar producto
router.put("/:pid", updateProduct);

//  Eliminar producto
router.delete("/:pid", deleteProduct);

export default router;