// routes/trips.js
const express = require('express');
const router = express.Router();
const { createTripController, getTripController, listTripsByUserController } = require('../controllers/trips');

router.post('/', createTripController);
router.get('/:id', getTripController);
router.get('/', listTripsByUserController);

module.exports = router;
