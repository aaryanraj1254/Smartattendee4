const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkInTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
