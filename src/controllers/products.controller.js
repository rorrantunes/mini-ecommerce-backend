import { ProductModel } from "../models/product.model.js";

// 📦 GET /api/products  (filtros + paginación + sort + query)
export const getProducts = async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = Number(limit);
    page = Number(page);

    // 🔎 Filtro dinámico
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

    const totalProducts = await ProductModel.countDocuments(filter);

    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPages = Math.ceil(totalProducts / limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const buildLink = (p) =>
      `${baseUrl}?limit=${limit}&page=${p}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

    res.json({
      status: "success",
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? buildLink(page - 1) : null,
      nextLink: hasNextPage ? buildLink(page + 1) : null
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

// 🔍 GET /api/products/:pid
export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid);

    if (!product) {
      return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    }

    res.json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// ➕ POST /api/products
export const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ status: "success", product: newProduct });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// ✏️ PUT /api/products/:pid
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const updated = await ProductModel.findByIdAndUpdate(
      pid,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    }

    res.json({ status: "success", product: updated });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// ❌ DELETE /api/products/:pid
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deleted = await ProductModel.findByIdAndDelete(pid);

    if (!deleted) {
      return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    }

    res.json({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};