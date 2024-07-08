const Category = require('../models/Category');

// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({
      name
    });

    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Obtenir toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Obtenir une catégorie par son id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Catégorie inconnue' });
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Mettre à jour une catégorie par son id
const updateCategoryById = async (req, res) => {
  const { name } = req.body;

  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Catégorie inconnue' });

    category.name = name;

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Supprimer une catégorie par son id
const deleteCategoryById = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Catégorie inconnue' });

    await category.remove();
    res.json({ msg: 'Catégorie supprimée avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};
