const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const listEndpoints = require("express-list-endpoints");
require('dotenv').config();

require('./config/passport');  

const chatRoutes = require("./routes/chatRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

 app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',    
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }    
}));

app.use(passport.initialize());
app.use(passport.session());  

// Routes
app.use('/auth', require('./routes/auth'));
app.use('api/auth', authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/events", eventRoutes);

// Start Server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

startServer();