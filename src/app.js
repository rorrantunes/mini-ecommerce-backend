import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Socket.io
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado');

  socket.on('newProduct', async (product) => {
    await productManager.addProduct(product);
    const products = await productManager.getProducts();
    io.emit('updateProducts', products);
  });

  socket.on('deleteProduct', async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    io.emit('updateProducts', products);
  });
});

// Server
httpServer.listen(8080, () => {
  console.log('🚀 Servidor escuchando en puerto 8080');
});