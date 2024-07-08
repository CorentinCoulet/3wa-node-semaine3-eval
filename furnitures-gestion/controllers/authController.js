const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
};

// Enregistrer un nouvel utilisateur
const registerUser = async (req, res) => {
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

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Authentifier un utilisateur
const authenticateUser = async (req, res) => {
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

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

module.exports = {
  registerUser,
  authenticateUser
};
