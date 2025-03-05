const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyAttendanceQR } = require("../middleware/verifyAttendance");

const router = express.Router();
router.post("/verify", verifyToken, verifyAttendanceQR);

module.exports = router;