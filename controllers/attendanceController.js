const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const attendance = await Attendance.create({ event: eventId, user: userId });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
