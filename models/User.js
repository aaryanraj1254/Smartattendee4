const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    provider: { type: String, default: 'local' },   
    providerId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);