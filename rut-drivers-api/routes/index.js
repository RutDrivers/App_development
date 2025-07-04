const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const tripRoutes = require('./trips');
const driverRoutes = require('./drivers');
const vehicleRoutes = require('./vehicles');
const paymentRoutes = require('./payments');
const ratingRoutes = require('./ratings');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/drivers', driverRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/payments', paymentRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;
