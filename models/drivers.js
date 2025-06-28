// models/drivers.js
const db = require('../db');

async function createDriver({ name, email, password, status }) {
  const result = await db.query(
    'INSERT INTO drivers (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, status]
  );
  return result.rows[0];
}

async function findDriverByEmail(email) {
  const result = await db.query('SELECT * FROM drivers WHERE email = $1', [email]);
  return result.rows[0];
}

async function findDriverById(id) {
  const result = await db.query('SELECT * FROM drivers WHERE id = $1', [id]);
  return result.rows[0];
}

async function updateDriverStatus(id, status) {
  const result = await db.query('UPDATE drivers SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
  return result.rows[0];
}

module.exports = { createDriver, findDriverByEmail, findDriverById, updateDriverStatus };
