// src/routes/products.router.js
import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager();

// para listar todos los productos!!
router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

// para obtener producto por ID!!
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(pid);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
});

// para crear nuevo producto!
router.post('/', async (req, res) => {
  const productData = req.body;
  const newProduct = await manager.addProduct(productData);
  res.status(201).json(newProduct);
});

// para actualizar producto por ID!
router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = await manager.updateProduct(pid, req.body);
  if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(updatedProduct);
});

// para eliminar producto por ID!
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  await manager.deleteProduct(pid);
  res.json({ message: 'Producto eliminado' });
});

export default router;