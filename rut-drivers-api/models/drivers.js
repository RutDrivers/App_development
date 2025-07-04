// models/drivers.js
const db = require('../db');

/**
 * Crea un nuevo conductor en la base de datos.
 * @param {Object} driver
 * @param {string} driver.name
 * @param {string} driver.email
 * @param {string} driver.password
 * @param {string} driver.status
 * @returns {Promise<Object>} Conductor creado
 */
async function createDriver({ name, email, password, status }) {
  const result = await db.query(
    'INSERT INTO drivers (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, status]
  );
  return result.rows[0];
}

/**
 * Busca un conductor por email.
 * @param {string} email
 * @returns {Promise<Object|null>} Conductor encontrado o null
 */
async function findDriverByEmail(email) {
  const result = await db.query('SELECT * FROM drivers WHERE email = $1', [email]);
  return result.rows[0];
}

/**
 * Busca un conductor por id.
 * @param {string} id
 * @returns {Promise<Object|null>} Conductor encontrado o null
 */
async function findDriverById(id) {
  const result = await db.query('SELECT * FROM drivers WHERE id = $1', [id]);
  return result.rows[0];
}

/**
 * Actualiza el estado de un conductor.
 * @param {string} id
 * @param {string} status
 * @returns {Promise<Object|null>} Conductor actualizado o null
 */
async function updateDriverStatus(id, status) {
  const result = await db.query('UPDATE drivers SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
  return result.rows[0];
}

/**
 * Busca un conductor disponible (status = 'available').
 * @returns {Promise<Object|null>} Conductor disponible o null
 */
async function findAvailableDriver() {
  const result = await db.query("SELECT * FROM drivers WHERE status = 'available' LIMIT 1");
  return result.rows[0];
}

/**
 * Asigna un conductor a un viaje y actualiza su estado a 'busy'.
 * @param {number} driver_id
 * @returns {Promise<Object>} Conductor actualizado
 */
async function setDriverBusy(driver_id) {
  const result = await db.query("UPDATE drivers SET status = 'busy' WHERE id = $1 RETURNING *", [driver_id]);
  return result.rows[0];
}

/**
 * Libera un conductor (status = 'available').
 * @param {number} driver_id
 * @returns {Promise<Object>} Conductor actualizado
 */
async function setDriverAvailable(driver_id) {
  const result = await db.query("UPDATE drivers SET status = 'available' WHERE id = $1 RETURNING *", [driver_id]);
  return result.rows[0];
}

module.exports = {
  createDriver,
  findDriverByEmail,
  findDriverById,
  updateDriverStatus,
  findAvailableDriver,
  setDriverBusy,
  setDriverAvailable
};
