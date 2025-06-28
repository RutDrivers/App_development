// routes/drivers.js
const express = require('express');
const router = express.Router();
const { registerDriver, loginDriver, getDriverProfile, setDriverStatus } = require('../controllers/drivers');

router.post('/register', registerDriver);
router.post('/login', loginDriver);
router.get('/:id', getDriverProfile);
router.patch('/:id/status', setDriverStatus);

module.exports = router;
