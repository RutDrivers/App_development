// Importamos librerías
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos la conexión a la base de datos
const db = require('./db');

// Importamos el enrutador principal
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');
const setupSwagger = require('./swagger');
const setupSocket = require('./socket');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Configuraciones base
app.use(cors());
app.use(express.json());

// Enrutador principal montado en raíz
app.use('/', routes);

// Documentación Swagger
setupSwagger(app);

// Ruta para probar conexión con la base de datos
app.get('/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.send(result.rows[0]); // { now: '2025-06-27T...' }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Manejo de errores centralizado
app.use(errorHandler);

// Puerto y escucha
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Socket.io
setupSocket(server);
