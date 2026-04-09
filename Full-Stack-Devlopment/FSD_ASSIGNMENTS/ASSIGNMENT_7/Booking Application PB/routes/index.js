const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Home Page
router.get('/', async (req, res) => {
  try {
    const featuredVehicles = await Vehicle.find().limit(6);
    res.render('index', { featuredVehicles: featuredVehicles || [] });
  } catch (err) {
    console.error("Home Page Error:", err);
    res.render('index', { featuredVehicles: [] });
  }
});

// Seed Route with Local Images
router.get('/seed', async (req, res) => {
  try {
    await Vehicle.deleteMany({});

    const sampleVehicles = [
      {
        title: "Toyota Camry 2020",
        type: "car",
        price: 1500000,
        year: 2020,
        mileage: 30000,
        description: "Excellent condition, single owner, low mileage used car in Mumbai.",
        image: "/images/vehicles/toyota-camry.jpg"
      },
      {
        title: "Honda City 2019",
        type: "car",
        price: 1200000,
        year: 2019,
        mileage: 45000,
        description: "Well maintained sedan, perfect for city driving.",
        image: "/images/vehicles/honda-city.jpg"
      },
      {
        title: "Royal Enfield Classic 350",
        type: "bike",
        price: 180000,
        year: 2022,
        mileage: 5000,
        description: "Vintage style bike in pristine condition.",
        image: "/images/vehicles/royal-enfield.jpg"
      }
    ];

    await Vehicle.insertMany(sampleVehicles);

    res.send(`
      <h1 class="text-success text-center mt-5">✅ Seeded Successfully with Your Local Images!</h1>
      <p class="text-center">Now visit Vehicles page to see real images.</p>
      <a href="/vehicles" class="btn btn-primary btn-lg mt-3">Go to Vehicles →</a>
    `);
  } catch (err) {
    console.error(err);
    res.send('<h1 class="text-danger">Error: ' + err.message + '</h1>');
  }
});

module.exports = router;