// routes/trips.js
/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Endpoints para viajes
 */

const express = require('express');
const router = express.Router();
const { createTripController, getTripController, listTripsByUserController, requestTripController, updateTripStatusController } = require('../controllers/trips');
const validate = require('../utils/validate');
const { authenticate, authorize } = require('../middlewares/auth');

// Solicitar viaje (asignación automática de conductor)
router.post('/request', authenticate, authorize(['user']), validate(['user_id', 'origin', 'destination']), requestTripController);
// Cambiar estado de viaje
router.patch('/:id/status', authenticate, authorize(['driver', 'admin']), validate(['status']), updateTripStatusController);
// Crear viaje manual (opcional)
router.post('/', authenticate, authorize(['user']), validate(['user_id', 'origin', 'destination']), createTripController);
// Obtener viaje por id
router.get('/:id', authenticate, getTripController);
// Listar viajes por usuario
router.get('/', authenticate, authorize(['user']), listTripsByUserController);

module.exports = router;
