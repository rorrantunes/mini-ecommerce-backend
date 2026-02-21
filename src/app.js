import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Server
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});