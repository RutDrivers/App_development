// models/vehicles.js
const db = require('../db');

/**
 * Crea un nuevo vehículo.
 * @param {Object} vehicle
 * @param {number} vehicle.driver_id
 * @param {string} vehicle.brand
 * @param {string} vehicle.model
 * @param {string} vehicle.plate
 * @param {string} vehicle.color
 * @param {number} vehicle.year
 * @returns {Promise<Object>} Vehículo creado
 */
async function createVehicle({ driver_id, brand, model, plate, color, year }) {
  const result = await db.query(
    'INSERT INTO vehicles (driver_id, brand, model, plate, color, year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [driver_id, brand, model, plate, color, year]
  );
  return result.rows[0];
}

/**
 * Lista los vehículos de un conductor.
 * @param {number} driver_id
 * @returns {Promise<Object[]>}
 */
async function listVehiclesByDriver(driver_id) {
  const result = await db.query('SELECT * FROM vehicles WHERE driver_id = $1', [driver_id]);
  return result.rows;
}

module.exports = { createVehicle, listVehiclesByDriver };
