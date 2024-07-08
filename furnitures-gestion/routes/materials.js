const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const auth = require('../middleware/auth');

// Créer un nouveau matériau
router.post('/', auth, async (req, res) => {
  const { name, type, supplier } = req.body;

  try {
    const newMaterial = new Material({
      name,
      type,
      supplier
    });

    const material = await newMaterial.save();
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir tous les matériaux
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir un matériau grâce à son id
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ msg: 'Matériau inconnu' });
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Mettre à jour un matériau grâce à son id
router.put('/:id', auth, async (req, res) => {
  const { name, type, supplier } = req.body;

  try {
    let material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ msg: 'Matériau inconnu' });

    material.name = name;
    material.type = type;
    material.supplier = supplier;

    await material.save();
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Supprimer un matériau grâce à son id
router.delete('/:id', auth, async (req, res) => {
  try {
    let material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ msg: 'Matériau inconnu' });

    await material.remove();
    res.json({ msg: 'Materiau supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
