const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const auth = require('../middleware/auth');

// Crée un nouveau meuble
router.post('/', auth, async (req, res) => {
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
});

// Obtenir tous les meubles
router.get('/', async (req, res) => {
  try {
    const furnitures = await Furniture.find().populate('category').populate('materials').populate('keywords');
    res.json(furnitures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir un meuble grâce à son id
router.get('/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id).populate('category').populate('materials').populate('keywords');
    if (!furniture) return res.status(404).json({ msg: 'Meuble inconnu' });
    res.json(furniture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Mettre à jour un meuble grâce à son id
router.put('/:id', auth, async (req, res) => {
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
});

// Supprimer un meuble grâce à son id
router.delete('/:id', auth, async (req, res) => {
  try {
    let furniture = await Furniture.findById(req.params.id);
    if (!furniture) return res.status(404).json({ msg: 'Meuble inconnu' });

    await furniture.remove();
    res.json({ msg: 'Meuble supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
