// models/ratings.js
const db = require('../db');

/**
 * Crea una nueva calificación.
 * @param {Object} rating
 * @param {number} rating.trip_id
 * @param {number} rating.user_id
 * @param {number} rating.driver_id
 * @param {number} rating.score
 * @param {string} rating.comment
 * @returns {Promise<Object>} Calificación creada
 */
async function createRating({ trip_id, user_id, driver_id, score, comment }) {
  const result = await db.query(
    'INSERT INTO ratings (trip_id, user_id, driver_id, score, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [trip_id, user_id, driver_id, score, comment]
  );
  return result.rows[0];
}

/**
 * Lista las calificaciones de un conductor.
 * @param {number} driver_id
 * @returns {Promise<Object[]>}
 */
async function listRatingsByDriver(driver_id) {
  const result = await db.query('SELECT * FROM ratings WHERE driver_id = $1', [driver_id]);
  return result.rows;
}

module.exports = { createRating, listRatingsByDriver };
