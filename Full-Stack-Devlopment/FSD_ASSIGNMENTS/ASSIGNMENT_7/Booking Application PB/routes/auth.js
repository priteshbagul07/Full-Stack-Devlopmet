const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET Login
router.get('/login', (req, res) => res.render('login'));

// POST Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
      return res.redirect('/');
    }
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// GET Register
router.get('/register', (req, res) => res.render('register'));

// POST Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.redirect('/register');

    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashedPassword }).save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;