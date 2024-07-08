const express = require('express');
const router = express.Router();
const Statistic = require('../models/Statistic');
const auth = require('../middleware/auth');

// Crée une nouvelle statistique
router.post('/', auth, async (req, res) => {
  const { user, furniture, action } = req.body;

  try {
    const newStatistic = new Statistic({
      user,
      furniture,
      action
    });

    const statistic = await newStatistic.save();
    res.json(statistic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir toutes les statistiques
router.get('/', auth, async (req, res) => {
  try {
    const statistics = await Statistic.find().populate('user').populate('furniture');
    res.json(statistics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir une statistique grâce à son id
router.get('/:id', auth, async (req, res) => {
  try {
    const statistic = await Statistic.findById(req.params.id).populate('user').populate('furniture');
    if (!statistic) return res.status(404).json({ msg: 'statistique inconnue' });
    res.json(statistic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Supprimer une statistique grâce à son id
router.delete('/:id', auth, async (req, res) => {
  try {
    let statistic = await Statistic.findById(req.params.id);
    if (!statistic) return res.status(404).json({ msg: 'statistique inconnue' });

    await statistic.remove();
    res.json({ msg: 'statistique supprimée avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
