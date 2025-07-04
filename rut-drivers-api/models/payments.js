// models/payments.js
const db = require('../db');

/**
 * Crea un nuevo pago.
 * @param {Object} payment
 * @param {number} payment.trip_id
 * @param {number} payment.amount
 * @param {string} payment.method
 * @returns {Promise<Object>} Pago creado
 */
async function createPayment({ trip_id, amount, method }) {
  const result = await db.query(
    'INSERT INTO payments (trip_id, amount, method) VALUES ($1, $2, $3) RETURNING *',
    [trip_id, amount, method]
  );
  return result.rows[0];
}

/**
 * Lista los pagos de un viaje.
 * @param {number} trip_id
 * @returns {Promise<Object[]>}
 */
async function listPaymentsByTrip(trip_id) {
  const result = await db.query('SELECT * FROM payments WHERE trip_id = $1', [trip_id]);
  return result.rows;
}

module.exports = { createPayment, listPaymentsByTrip };
