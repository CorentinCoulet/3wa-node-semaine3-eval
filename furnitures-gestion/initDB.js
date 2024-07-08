const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Category = require('./models/Category');
const Material = require('./models/Material');
const Keyword = require('./models/Keyword');
const Furniture = require('./models/Furniture');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté avec succès');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const initializeDB = async () => {
  await connectDB();

  // Créer un utilisateur admin
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);

  const user = new User({
    username: 'admin',
    password: hashedPassword,
    email: 'admin@example.com'
  });

  await user.save();

  // Créer des catégories initiales
  const categories = [
    { name: 'Chairs' },
    { name: 'Tables' },
    { name: 'Sofas' }
  ];
  await Category.insertMany(categories);

  // Créer des matériaux initiaux
  const materials = [
    { name: 'Wood', type: 'Natural', supplier: 'Supplier A' },
    { name: 'Metal', type: 'Synthetic', supplier: 'Supplier B' }
  ];
  await Material.insertMany(materials);

  // Créer des mots-clés initiaux
  const keywords = [
    { keyword: 'Modern' },
    { keyword: 'Vintage' }
  ];
  await Keyword.insertMany(keywords);

  console.log('Base de données initialisée avec succès');
  mongoose.disconnect();
};

initializeDB();
