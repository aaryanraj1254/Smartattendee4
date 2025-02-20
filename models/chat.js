const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    replies: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: String,
        timestamp: { type: Date, default: Date.now }
    }],
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);