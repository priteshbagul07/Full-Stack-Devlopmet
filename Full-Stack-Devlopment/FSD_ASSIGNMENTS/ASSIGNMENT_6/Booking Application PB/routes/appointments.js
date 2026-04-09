const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Vehicle = require('../models/Vehicle');

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/login');
};

// Book appointment form
router.get('/book/:vehicleId', isAuthenticated, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.vehicleId);
  if (!vehicle) return res.status(404).send('Vehicle not found');
  res.render('book-appointment', { vehicle });
});

// Create appointment
router.post('/book/:vehicleId', isAuthenticated, async (req, res) => {
  try {
    const { date, time } = req.body;
    const appointment = new Appointment({
      user: req.session.user.id,
      vehicle: req.params.vehicleId,
      date: new Date(date),
      time
    });
    await appointment.save();
    res.redirect('/appointments/my');
  } catch (err) {
    console.error(err);
    res.status(500).send('Booking error');
  }
});

// My appointments
router.get('/my', isAuthenticated, async (req, res) => {
  const appointments = await Appointment.find({ user: req.session.user.id })
    .populate('vehicle')
    .sort({ date: 1 });
  res.render('my-appointments', { appointments });
});

module.exports = router;