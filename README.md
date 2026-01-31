📦 project:
  📛 name: "**Entrega 1 – API Products & Carts**"
  👩‍💻 author: "**Valentina Rodrigues Antunes**"
  📝 description: >
    **API REST** desarrollada con **Node.js y Express** para la gestión de
    **productos** y **carritos de compra**, utilizando **persistencia en archivos JSON**.
    El objetivo es practicar rutas, lógica backend y testing de endpoints.

🛠️ technologies:
  - 🟢 Node.js
  - 🚀 Express
  - 🆔 UUID
  - 📂 File System
  - ⚡ Thunder Client

📁 structure:
  - 📄 src/app.js
  - 📄 src/routes/products.router.js
  - 📄 src/routes/carts.router.js
  - 📄 src/managers/ProductManager.js
  - 📄 src/managers/CartManager.js
  - 📄 src/data/products.json
  - 📄 src/data/carts.json

▶️ run:
  🧩 steps:
    1. `npm install`
    2. `node src/app.js`
  🌐 server: "**http://localhost:8080**"

🔗 endpoints:
  🛍️ products:
    1. `GET    /api/products`
    2. `GET    /api/products/:pid`
    3. `POST   /api/products`
    4. `PUT    /api/products/:pid`
    5. `DELETE /api/products/:pid`

  🛒 carts:
    1. `POST   /api/carts`
    2. `GET    /api/carts/:cid`
    3. `POST   /api/carts/:cid/product/:pid`

🧪 testing:
  🔧 tool: "**Thunder Client**"
  ✅ steps:
    1. Crear un producto
    2. Crear un carrito
    3. Agregar un producto al carrito
    4. Consultar el carrito por ID

📌 notes:
  ℹ️ info: >
    El proyecto **no incluye interfaz gráfica**.
    Todas las pruebas se realizan mediante **requests HTTP**.
    Cumple con los requisitos solicitados en la consigna.

