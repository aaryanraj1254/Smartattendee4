const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const axios = require("axios");

 
router.post("/send", async (req, res) => {
    try {
        const { sender, message } = req.body;
        const newMessage = new Chat({ sender, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } 
    catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

  
router.post("/reply", async (req, res) => {
    try {
        const { sender, message, replyTo } = req.body;
 
        const response = await axios.post("https://hivemind-spam-detection-ml.onrender.com/predict/", { text: message });
        const isSpam = response.data.spam ? true : false;

        const newReply = new Chat({ sender, message, replyTo, isSpam });
        await newReply.save();

        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ error: "Failed to send reply" });
    }
});

 
router.get("/messages", async (req, res) => {
    try {
        const messages = await Chat.find();
  
        const updatedMessages = await Promise.all(messages.map(async (msg) => {
            const response = await axios.post("https://hivemind-spam-detection-ml.onrender.com/predict/", { text: msg.message });
            msg.isSpam = response.data.spam ? true : false;
            return msg;
        }));

        res.json(updatedMessages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

module.exports = router;
