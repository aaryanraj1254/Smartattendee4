
const QRCode = require('../models/QRCode'); 

const saveQRCode = async (req, res) => {
  try {
    const { eventId, eventName, date } = req.body;
    const qrCode = req.qrCode; 
    const expiresAt=new Date(Date.now()+30*1000);
    


    
    const savedQR = await QRCode.create({
      eventId,
      eventName,
      date,
      qrCode,
      expiresAt,
      used:false
    });

    console.log("QR Code saved:", savedQR);
    res.status(201).json({ message: "QR Code generated and saved!", qrCode: savedQR });
  } catch (error) {
    console.error("Failed to save QR code:", error);
    res.status(500).json({ error: "Failed to save QR code" });
  }
};

module.exports = { saveQRCode };