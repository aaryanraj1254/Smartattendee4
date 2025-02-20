const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

// Google  
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => res.redirect('/dashboard'));

// GitHub  
router.get('/github', 
    passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => res.redirect('/dashboard'));

// LinkedIn  
router.get('/linkedin', 
    passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => res.redirect('/dashboard'));

module.exports = router;
 