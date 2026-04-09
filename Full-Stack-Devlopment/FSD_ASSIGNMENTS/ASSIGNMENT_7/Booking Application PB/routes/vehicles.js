const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// All vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });
  res.render('vehicles', { vehicles });
});

// Vehicle detail
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).send('Vehicle not found');
  res.render('vehicle-detail', { vehicle });
});

module.exports = router;