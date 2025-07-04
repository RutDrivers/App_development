// controllers/vehicles.js
const { createVehicle, listVehiclesByDriver } = require('../models/vehicles');
const { success, error } = require('../utils/response');

/**
 * Controlador para crear un vehículo.
 */
async function createVehicleController(req, res, next) {
  try {
    const { driver_id, brand, model, plate, color, year } = req.body;
    if (!driver_id || !brand || !model || !plate) return error(res, 'Faltan campos requeridos', 400);
    const vehicle = await createVehicle({ driver_id, brand, model, plate, color, year });
    success(res, vehicle);
  } catch (err) {
    next(err);
  }
}

/**
 * Controlador para listar vehículos de un conductor.
 */
async function listVehiclesByDriverController(req, res, next) {
  try {
    const { driver_id } = req.query;
    const vehicles = await listVehiclesByDriver(driver_id);
    success(res, vehicles);
  } catch (err) {
    next(err);
  }
}

module.exports = { createVehicleController, listVehiclesByDriverController };
