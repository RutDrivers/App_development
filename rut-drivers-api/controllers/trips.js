// controllers/trips.js
const { createTrip, findTripById, listTripsByUser, updateTripStatus } = require('../models/trips');
const { findAvailableDriver, setDriverBusy, setDriverAvailable } = require('../models/drivers');
const { success, error } = require('../utils/response');

/**
 * Controlador para crear un viaje.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
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

/**
 * Controlador para obtener un viaje por id.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
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

/**
 * Controlador para listar viajes por usuario.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function listTripsByUserController(req, res, next) {
  try {
    const { user_id } = req.query;
    const trips = await listTripsByUser(user_id);
    success(res, trips);
  } catch (err) {
    next(err);
  }
}

/**
 * Solicita un viaje: asigna automáticamente un conductor disponible.
 */
async function requestTripController(req, res, next) {
  try {
    const { user_id, origin, destination } = req.body;
    // Buscar conductor disponible
    const driver = await findAvailableDriver();
    if (!driver) return error(res, 'No hay conductores disponibles', 409);
    // Asignar conductor y ponerlo ocupado
    await setDriverBusy(driver.id);
    // Crear viaje con driver asignado y status 'assigned'
    const trip = await createTrip({ user_id, origin, destination, status: 'assigned', driver_id: driver.id });
    success(res, trip);
  } catch (err) {
    next(err);
  }
}

/**
 * Cambia el estado de un viaje (aceptado, en curso, finalizado, cancelado).
 * Si se finaliza/cancela, libera el conductor.
 */
async function updateTripStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const trip = await findTripById(id);
    if (!trip) return error(res, 'Viaje no encontrado', 404);
    const updated = await updateTripStatus(id, status);
    // Si el viaje termina o se cancela, liberar conductor
    if (['completed', 'cancelled'].includes(status) && trip.driver_id) {
      await setDriverAvailable(trip.driver_id);
    }
    success(res, updated);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTripController,
  getTripController,
  listTripsByUserController,
  requestTripController,
  updateTripStatusController
};
