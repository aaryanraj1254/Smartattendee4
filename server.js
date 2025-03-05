const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const qrRoute = require('./routes/qrRoutes');
require('dotenv').config();
require('./config/passport');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); 

app.use('/api/qr', qrRoute);

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to HiveMind!');
});


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer();