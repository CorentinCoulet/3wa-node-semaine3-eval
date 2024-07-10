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

  // Créer des catégories de base
  const categories = [
    { name: 'Chairs' },
    { name: 'Tables' },
    { name: 'Sofas' }
  ];
  await Category.insertMany(categories);

  // Créer des matériaux de base
  const materials = [
    { name: 'Wood', type: 'Natural', supplier: 'Supplier A' },
    { name: 'Metal', type: 'Synthetic', supplier: 'Supplier B' }
  ];
  await Material.insertMany(materials);

  // Créer des mots-clés de base
  const keywords = [
    { keyword: 'Modern' },
    { keyword: 'Vintage' }
  ];
  await Keyword.insertMany(keywords);

  // Créer des meubles de base
  const furniture = [
    { name: 'Modern Chair', category: categories[0]._id, material: materials[0]._id, keywords: [keywords[0]._id] },
    { name: 'Vintage Table', category: categories[1]._id, material: materials[1]._id, keywords: [keywords[1]._id] }
  ];
  const savedFurnitures = await Furniture.insertMany(furniture);

  // Créer des statistiques de base
  const statistics = [
    { user: user._id, furniture: savedFurnitures[0]._id, action: 'view' },
    { user: user._id, furniture: savedFurnitures[1]._id, action: 'purchase' }
  ];
  await Statistic.insertMany(statistics);

  console.log('Base de données initialisée avec succès');
  mongoose.disconnect();
};

initializeDB();
