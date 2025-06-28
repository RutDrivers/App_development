// models/trips.js
const db = require('../db');

async function createTrip({ user_id, origin, destination, status }) {
  const result = await db.query(
    'INSERT INTO trips (user_id, origin, destination, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, origin, destination, status]
  );
  return result.rows[0];
}

async function findTripById(id) {
  const result = await db.query('SELECT * FROM trips WHERE id = $1', [id]);
  return result.rows[0];
}

async function listTripsByUser(user_id) {
  const result = await db.query('SELECT * FROM trips WHERE user_id = $1', [user_id]);
  return result.rows;
}

module.exports = { createTrip, findTripById, listTripsByUser };
