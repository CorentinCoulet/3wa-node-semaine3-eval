const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Créer un compte
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'L\'utilisateur existe déjà' });
    }

    user = new User({
      username,
      password,
      email
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: 3600 }, 
      (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { httpOnly: true });
      res.json({ redirectTo: '/login' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Se connecter
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Données d\'authentification invalides' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Données d\'authentification invalides' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { httpOnly: true });
      res.json({ redirectTo: '/login' });
    });
  } catch (err) {
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
