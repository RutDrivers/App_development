// controllers/payments.js
const { createPayment, listPaymentsByTrip } = require('../models/payments');
const { success, error } = require('../utils/response');

/**
 * Controlador para crear un pago.
 */
async function createPaymentController(req, res, next) {
  try {
    const { trip_id, amount, method } = req.body;
    if (!trip_id || !amount || !method) return error(res, 'Faltan campos requeridos', 400);
    const payment = await createPayment({ trip_id, amount, method });
    success(res, payment);
  } catch (err) {
    next(err);
  }
}

/**
 * Controlador para listar pagos de un viaje.
 */
async function listPaymentsByTripController(req, res, next) {
  try {
    const { trip_id } = req.query;
    const payments = await listPaymentsByTrip(trip_id);
    success(res, payments);
  } catch (err) {
    next(err);
  }
}

module.exports = { createPaymentController, listPaymentsByTripController };
