const Furniture = require('../models/Furniture');
const Statistic = require('../models/Statistic');
const mongoose = require('mongoose');
const Keyword = require('../models/Keyword');

// Créer un nouveau meuble
exports.createFurniture = async (req, res) => {
  const { name, category, materials, quantity, keywords } = req.body;
  try {
    let materialIds = [];
    if (Array.isArray(materials)) {
      materialIds = materials.map(mat => {
        if (typeof mat === 'string' && mongoose.Types.ObjectId.isValid(mat)) {
          return new mongoose.Types.ObjectId(mat);
        } else {
          throw new Error(`Invalid material ID: ${mat}`);
        }
      });
    } else if (typeof materials === 'string' && mongoose.Types.ObjectId.isValid(materials)) {
      materialIds = [new mongoose.Types.ObjectId(materials)];
    } else {
      throw new Error('Invalid format for materials');
    }

    let keywordObj = await Keyword.findOne({ keyword: keywords });
    if (!keywordObj) {
      keywordObj = await Keyword.create({ keyword: keywords });
    }

    const newFurniture = new Furniture({
      name,
      category,
      quantity,
      materialIds,
      keywords: [keywordObj._id],
    });

    const furniture = await newFurniture.save();

    // Ajouter une statistique pour la création du meuble
    const newStatistic = new Statistic({
      user: req.user.id,
      furniture: furniture._id,
      action: 'create'
    });
    await newStatistic.save();

    req.flash('success_msg', 'Meuble créé avec succès');
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error_msg', 'Erreur lors de la création du meuble');
    res.redirect('/dashboard');
  }
};

// Visualiser les meubles avec des mot-clefs
exports.getAllFurnituresWithFilter = async (req, res) => {
  try {
    let filter = {};
    const { keyword } = req.query;

    if (keyword) {
      // Trouver le mot-clé dans la collection Keyword
      const keywordObj = await Keyword.findOne({ keyword });

      if (keywordObj) {
        filter = { keywords: keywordObj._id };
      } else {
        // Si le mot-clé n'est pas trouvé, retourner une liste vide
        return res.json([]);
      }
    }

    // Récupérer toutes les fournitures avec ou sans filtrage par mot-clé
    const furnitures = await Furniture.find(filter).populate('keywords');
    res.json(furnitures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Visualiser un meuble 
exports.getFurnitureById = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id);
    if (!furniture) return res.status(404).json({ msg: 'Meuble non trouvé' });

    // Ajouter une statistique pour la visualisation du meuble
    const newStatistic = new Statistic({
      user: req.user.id,
      furniture: furniture._id,
      action: 'view'
    });
    await newStatistic.save();

    res.json(furniture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};
