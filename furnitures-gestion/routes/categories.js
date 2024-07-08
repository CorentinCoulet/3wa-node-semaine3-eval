const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Crée une nouvelle catégorie
router.post('/', auth, async (req, res) => {
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
});

// Obtenir toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir une catégorie grâce à son id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Catégorie inconnue' });
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Mettre à jour une catégorie grâce à son id
router.put('/:id', auth, async (req, res) => {
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
});

// Supprimer une catégorie grâce à son id
router.delete('/:id', auth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Catégorie inconnue' });

    await category.remove();
    res.json({ msg: 'Catégorie supprimée avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
