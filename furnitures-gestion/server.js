const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const userRoutes = require('./routes/users');
const materialRoutes = require('./routes/materials');
const categoryRoutes = require('./routes/categories');
const furnitureRoutes = require('./routes/furnitures');
const keywordRoutes = require('./routes/keywords');
const statisticRoutes = require('./routes/statistics');

const User = require('./models/User');
const auth = require('./middleware/auth');

dotenv.config();

connectDB();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/furnitures', furnitureRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/statistics', statisticRoutes);

app.use(express.static('public'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('index');
});

// Route pour la page de connexion
app.get('/login', (req, res) => {
  res.render('login');
});

// Route pour la page d'inscription
app.get('/register', (req, res) => {
  res.render('register');
});

// Route pour le tableau de bord
app.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }
    res.render('dashboard', { user });
  } catch (err) {
    res.status(500).send('Erreur du serveur');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
