const Furniture = require('../models/Furniture');

// Créer un nouveau meuble
const createFurniture = async (req, res) => {
  const { name, category, quantity, materials, keywords } = req.body;

  try {
    const newFurniture = new Furniture({
      name,
      category,
      quantity,
      materials,
      keywords
    });

    const furniture = await newFurniture.save();
    res.json(furniture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Obtenir tous les meubles
const getAllFurnitures = async (req, res) => {
  try {
    const furnitures = await Furniture.find()
      .populate('category')
      .populate('materials')
      .populate('keywords');
    res.json(furnitures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Obtenir un meuble par son id
const getFurnitureById = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id)
      .populate('category')
      .populate('materials')
      .populate('keywords');
    if (!furniture) return res.status(404).json({ msg: 'Meuble inconnu' });
    res.json(furniture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Mettre à jour un meuble par son id
const updateFurnitureById = async (req, res) => {
  const { name, category, quantity, materials, keywords } = req.body;

  try {
    let furniture = await Furniture.findById(req.params.id);
    if (!furniture) return res.status(404).json({ msg: 'Meuble inconnu' });

    furniture.name = name;
    furniture.category = category;
    furniture.quantity = quantity;
    furniture.materials = materials;
    furniture.keywords = keywords;

    await furniture.save();
    res.json(furniture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Supprimer un meuble par son id
const deleteFurnitureById = async (req, res) => {
  try {
    let furniture = await Furniture.findById(req.params.id);
    if (!furniture) return res.status(404).json({ msg: 'Meuble inconnu' });

    await furniture.remove();
    res.json({ msg: 'Meuble supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

module.exports = {
  createFurniture,
  getAllFurnitures,
  getFurnitureById,
  updateFurnitureById,
  deleteFurnitureById
};
