const QRCode = require('../models/QRCode');


const generateAttendanceQR = async (req, res, next) => {
  try {
    const { eventId, eventName, date } = req.body;

    if (!eventId || !eventName || !date) {
      return res.status(400).json({ error: "Missing required fields: eventId, eventName, or date" });
    }

    
    const qrCodeData = `${eventId}-${Date.now()}`;
    const expiresAt = new Date(Date.now() + 30 * 1000); 

    
    const newQRCode = await QRCode.create({
      eventId,
      eventName,
      date,
      qrCode: qrCodeData,
      expiresAt,
      used: false,
    });

    
    req.qrCode = newQRCode.qrCode;

    console.log("Generated QR Code:", newQRCode);
    next();
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};


const verifyQR = async (req, res, next) => {
  try {
    const { qrCode } = req.body;

    if (!qrCode) {
      return res.status(400).json({ error: "QR code is required" });
    }

    const qrData = await QRCode.findOneAndUpdate(
      { qrCode, expiresAt: { $gt: new Date() }, used: false },
      { used: true },
      { new: true }
    );

    if (!qrData) {
      return res.status(400).json({ message: "Invalid, expired, or already used QR code" });
    }

    req.eventId = qrData.eventId;
    next();
  } catch (error) {
    console.error("QR validation error:", error);
    res.status(500).json({ error: "Failed to validate QR code" });
  }
};

console.log("Exports in qrMiddleware.js:", {
  generateAttendanceQR,
  verifyQR,
});

module.exports = { generateAttendanceQR, verifyQR };
