const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { generateAttendanceQR, verifyQR } = require("../middleware/qrmiddleware");
const { saveQRCode } = require("../controllers/qrCodeController");

const router = express.Router();

console.log("generateAttendanceQR:", generateAttendanceQR);
console.log("verifyQR:", verifyQR);
console.log("saveQRCode:", saveQRCode);
console.log("authenticateToken:", authenticateToken); 
console.log("generateAttendanceQR:", generateAttendanceQR);

router.post("/generate", authenticateToken, generateAttendanceQR, saveQRCode);

module.exports = router;
