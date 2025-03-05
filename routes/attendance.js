const express = require('express');
const router = express.Router();
const { checkIn } = require('../controllers/attendanceController');

router.post('/checkin', checkIn);

module.exports = router;
