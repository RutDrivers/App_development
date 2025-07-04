// routes/vehicles.js
/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Endpoints para vehículos
 */
const express = require('express');
const router = express.Router();
const { createVehicleController, listVehiclesByDriverController } = require('../controllers/vehicles');
const validate = require('../utils/validate');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize(['driver']), validate(['driver_id', 'brand', 'model', 'plate']), createVehicleController);
router.get('/', authenticate, authorize(['driver']), listVehiclesByDriverController);

module.exports = router;
