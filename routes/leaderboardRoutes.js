const express = require("express");
const Leaderboard = require("../models/Leaderboard");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

 
router.get("/", async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ points: -1 }).populate("user", "email");
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

 
router.post("/update", authMiddleware, async (req, res) => {
    try {
        const { points } = req.body;
        let userEntry = await Leaderboard.findOne({ user: req.user.id });

        if (!userEntry) {
            userEntry = new Leaderboard({ user: req.user.id, points });
        } else {
            userEntry.points += points;
            userEntry.lastUpdated = Date.now();
        }

        await userEntry.save();
        res.json(userEntry);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;