// controllers/ratings.js
const { createRating, listRatingsByDriver } = require('../models/ratings');
const { success, error } = require('../utils/response');

/**
 * Controlador para crear una calificación.
 */
async function createRatingController(req, res, next) {
  try {
    const { trip_id, user_id, driver_id, score, comment } = req.body;
    if (!trip_id || !user_id || !driver_id || !score) return error(res, 'Faltan campos requeridos', 400);
    const rating = await createRating({ trip_id, user_id, driver_id, score, comment });
    success(res, rating);
  } catch (err) {
    next(err);
  }
}

/**
 * Controlador para listar calificaciones de un conductor.
 */
async function listRatingsByDriverController(req, res, next) {
  try {
    const { driver_id } = req.query;
    const ratings = await listRatingsByDriver(driver_id);
    success(res, ratings);
  } catch (err) {
    next(err);
  }
}

module.exports = { createRatingController, listRatingsByDriverController };
