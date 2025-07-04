// routes/payments.js
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Endpoints para pagos
 */
const express = require('express');
const router = express.Router();
const { createPaymentController, listPaymentsByTripController } = require('../controllers/payments');
const validate = require('../utils/validate');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, validate(['trip_id', 'amount', 'method']), createPaymentController);
router.get('/', authenticate, listPaymentsByTripController);

module.exports = router;
