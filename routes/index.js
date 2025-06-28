const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const tripRoutes = require('./trips');
const driverRoutes = require('./drivers');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/drivers', driverRoutes);

module.exports = router;
