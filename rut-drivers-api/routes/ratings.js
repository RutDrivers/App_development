// routes/ratings.js
/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Endpoints para calificaciones
 */
const express = require('express');
const router = express.Router();
const { createRatingController, listRatingsByDriverController } = require('../controllers/ratings');
const validate = require('../utils/validate');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, validate(['trip_id', 'user_id', 'driver_id', 'score']), createRatingController);
router.get('/', authenticate, listRatingsByDriverController);

module.exports = router;
