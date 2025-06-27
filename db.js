// Importamos la clase Pool de la librería 'pg' para conectarnos a PostgreSQL
const { Pool } = require('pg');

// Usamos la variable de entorno que contiene la URL de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necesario para Render (certificado SSL)
  }
});

// Exportamos la instancia de conexión para usarla en otros archivos
module.exports = pool;
