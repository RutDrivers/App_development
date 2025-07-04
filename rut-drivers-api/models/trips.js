// models/trips.js
const db = require('../db');

/**
 * Crea un nuevo viaje en la base de datos.
 * @param {Object} trip
 * @param {string} trip.user_id
 * @param {string} trip.origin
 * @param {string} trip.destination
 * @param {string} trip.status
 * @returns {Promise<Object>} Viaje creado
 */
async function createTrip({ user_id, origin, destination, status }) {
  const result = await db.query(
    'INSERT INTO trips (user_id, origin, destination, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, origin, destination, status]
  );
  return result.rows[0];
}

/**
 * Busca un viaje por id.
 * @param {string} id
 * @returns {Promise<Object|null>} Viaje encontrado o null
 */
async function findTripById(id) {
  const result = await db.query('SELECT * FROM trips WHERE id = $1', [id]);
  return result.rows[0];
}

/**
 * Lista los viajes de un usuario.
 * @param {string} user_id
 * @returns {Promise<Object[]>} Lista de viajes
 */
async function listTripsByUser(user_id) {
  const result = await db.query('SELECT * FROM trips WHERE user_id = $1', [user_id]);
  return result.rows;
}

/**
 * Actualiza el estado de un viaje.
 * @param {number} trip_id
 * @param {string} status
 * @returns {Promise<Object>} Viaje actualizado
 */
async function updateTripStatus(trip_id, status) {
  const result = await db.query('UPDATE trips SET status = $1 WHERE id = $2 RETURNING *', [status, trip_id]);
  return result.rows[0];
}

module.exports = { createTrip, findTripById, listTripsByUser, updateTripStatus };
