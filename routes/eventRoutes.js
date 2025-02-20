const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

 
router.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

 
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const event = new Event({ title, description, date });
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;