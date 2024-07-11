const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Category = require('./models/Category');
const Material = require('./models/Material');
const Keyword = require('./models/Keyword');
const Furniture = require('./models/Furniture');
const Statistic = require('./models/Statistic');

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

  try {
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
      { name: 'Chaises' },
      { name: 'Tables' },
      { name: 'Canapés' }
    ];
    const savedCategories = await Category.insertMany(categories);

    // Créer des matériaux de base avec des descriptions en français
    const materials = [
      { 
        name: 'Bois', 
        type: 'Naturel', 
        supplier: 'Fournisseur A',
        description: 'Bois naturel de haute qualité provenant de forêts durables.' 
      },
      { 
        name: 'Métal', 
        type: 'Synthétique', 
        supplier: 'Fournisseur B',
        description: 'Alliage métallique synthétique durable, adapté à diverses applications.' 
      },
      { 
        name: 'Verre', 
        type: 'Naturel', 
        supplier: 'Fournisseur C',
        description: 'Verre clair et trempé adapté aux meubles et articles décoratifs.' 
      },
      { 
        name: 'Tissu', 
        type: 'Naturel', 
        supplier: 'Fournisseur D',
        description: 'Matériaux textiles doux et durables pour l\'ameublement et les coussins.' 
      },
      { 
        name: 'Plastique', 
        type: 'Synthétique', 
        supplier: 'Fournisseur E',
        description: 'Matériaux plastiques recyclables et légers pour des designs modernes.' 
      },
      { 
        name: 'Cuir', 
        type: 'Naturel', 
        supplier: 'Fournisseur F',
        description: 'Cuir luxueux et durable adapté aux meubles haut de gamme.' 
      }
    ];
    const savedMaterials = await Material.insertMany(materials);

    // Créer des mots-clés de base en français
    const keywords = [
      { keyword: 'Moderne' },
      { keyword: 'Vintage' },
      { keyword: 'Rustique' },
      { keyword: 'Contemporain' },
      { keyword: 'Industriel' }
    ];
    const savedKeywords = await Keyword.insertMany(keywords);

    // Créer des meubles de base avec les nouvelles données
    const furniture = [
      { 
        name: 'Chaise Moderne en Bois', 
        category: savedCategories[0]._id, 
        material: savedMaterials[0]._id, 
        keywords: [savedKeywords[0]._id, savedKeywords[3]._id] 
      },
      { 
        name: 'Table Vintage en Métal', 
        category: savedCategories[1]._id, 
        material: savedMaterials[1]._id, 
        keywords: [savedKeywords[1]._id, savedKeywords[2]._id] 
      },
      { 
        name: 'Étagère Contemporaine en Verre', 
        category: savedCategories[1]._id, 
        material: savedMaterials[2]._id, 
        keywords: [savedKeywords[0]._id, savedKeywords[3]._id] 
      },
      { 
        name: 'Canapé Rustique en Tissu', 
        category: savedCategories[2]._id, 
        material: savedMaterials[3]._id, 
        keywords: [savedKeywords[2]._id, savedKeywords[4]._id] 
      },
      { 
        name: 'Chaise Moderne en Plastique', 
        category: savedCategories[0]._id, 
        material: savedMaterials[4]._id, 
        keywords: [savedKeywords[0]._id, savedKeywords[3]._id] 
      },
      { 
        name: 'Fauteuil Luxueux en Cuir', 
        category: savedCategories[0]._id, 
        material: savedMaterials[5]._id, 
        keywords: [savedKeywords[1]._id, savedKeywords[4]._id] 
      }
    ];
    const savedFurnitures = await Furniture.insertMany(furniture);

    // Créer des statistiques de base
    const statistics = [
      { user: user._id, furniture: savedFurnitures[0]._id, action: 'view' },
      { user: user._id, furniture: savedFurnitures[1]._id, action: 'purchase' },
      { user: user._id, furniture: savedFurnitures[2]._id, action: 'view' },
      { user: user._id, furniture: savedFurnitures[3]._id, action: 'view' },
      { user: user._id, furniture: savedFurnitures[4]._id, action: 'purchase' },
      { user: user._id, furniture: savedFurnitures[5]._id, action: 'view' }
    ];
    await Statistic.insertMany(statistics);

    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données :', error.message);
  } finally {
    mongoose.disconnect();
  }
};

initializeDB();
