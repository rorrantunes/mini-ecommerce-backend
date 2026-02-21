import { ProductModel } from "../models/product.model.js";

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

    // 📦 Query principal
    const totalProducts = await ProductModel.countDocuments(filter);

    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPages = Math.ceil(totalProducts / limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const buildLink = (p) => `${baseUrl}?limit=${limit}&page=${p}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

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