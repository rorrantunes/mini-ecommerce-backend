import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

// 🛍️ Vista de productos con paginación, filtros y ordenamiento
router.get("/products", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = Number(limit);
    page = Number(page);

    // 🔎 Filtros
    let filter = {};

    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    // 🔃 Ordenamiento
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    // 📦 Query Mongo
    const totalProducts = await ProductModel.countDocuments(filter);

    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const totalPages = Math.ceil(totalProducts / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const baseUrl = `/products`;

    const buildLink = (p) =>
      `${baseUrl}?limit=${limit}&page=${p}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

    res.render("index", {
      products,
      page,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? buildLink(page - 1) : null,
      nextLink: hasNextPage ? buildLink(page + 1) : null
    });

  } catch (error) {
    res.status(500).send("Error cargando productos");
  }
});

// 📄 Vista producto individual
router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await ProductModel.findById(pid).lean();

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", { product });

  } catch (error) {
    res.status(500).send("Error cargando producto");
  }
});

// 🛒 Vista carrito con populate
router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid)
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", {
      cartId: cart._id,
      products: cart.products
    });

  } catch (error) {
    res.status(500).send("Error cargando carrito");
  }
});

export default router;