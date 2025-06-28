// controllers/trips.js
const { createTrip, findTripById, listTripsByUser } = require('../models/trips');
const { success, error } = require('../utils/response');

async function createTripController(req, res, next) {
  try {
    const { user_id, origin, destination } = req.body;
    if (!user_id || !origin || !destination) {
      return error(res, 'Faltan campos requeridos', 400);
    }
    const trip = await createTrip({ user_id, origin, destination, status: 'pending' });
    success(res, trip);
  } catch (err) {
    next(err);
  }
}

async function getTripController(req, res, next) {
  try {
    const { id } = req.params;
    const trip = await findTripById(id);
    if (!trip) return error(res, 'Viaje no encontrado', 404);
    success(res, trip);
  } catch (err) {
    next(err);
  }
}

async function listTripsByUserController(req, res, next) {
  try {
    const { user_id } = req.query;
    const trips = await listTripsByUser(user_id);
    success(res, trips);
  } catch (err) {
    next(err);
  }
}

module.exports = { createTripController, getTripController, listTripsByUserController };
