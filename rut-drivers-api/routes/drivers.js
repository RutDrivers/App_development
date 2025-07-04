// routes/drivers.js
/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Endpoints para conductores
 */

const express = require('express');
const router = express.Router();
const { registerDriver, loginDriver, getDriverProfile, setDriverStatus } = require('../controllers/drivers');
const validate = require('../utils/validate');
const { authenticate, authorize } = require('../middlewares/auth');

// Registro de conductor
router.post('/register', validate(['name', 'email', 'password']), registerDriver);
// Login de conductor
router.post('/login', validate(['email', 'password']), loginDriver);
// Perfil de conductor (solo autenticado y rol driver)
router.get('/:id', authenticate, authorize(['driver']), getDriverProfile);
// Cambiar estado de conductor (solo autenticado y rol driver)
router.patch('/:id/status', authenticate, authorize(['driver']), setDriverStatus);

module.exports = router;
