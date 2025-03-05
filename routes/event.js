const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

// Log every request to see if it's hitting the correct route
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

router.post('/create', (req, res) => {
  console.log('Request body:', req.body); // Log the request data
  createEvent(req, res);
});

router.get('/', (req, res) => {
  console.log('Fetching all events');
  getAllEvents(req, res);
});

router.get('/:id', (req, res) => {
  console.log('Fetching event with ID:', req.params.id);
  getEventById(req, res);
});

router.put('/:id', (req, res) => {
  console.log('Updating event with ID:', req.params.id);
  console.log('Request body:', req.body);
  updateEvent(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('Deleting event with ID:', req.params.id);
  deleteEvent(req, res);
});

module.exports = router;
