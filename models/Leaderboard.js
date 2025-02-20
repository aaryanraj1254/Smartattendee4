const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, required: true, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);