const express = require('express');
const router = express.Router();
const Keyword = require('../models/Keyword');
const auth = require('../middleware/auth');

// Crée un nouveau mot-clef
router.post('/', auth, async (req, res) => {
  const { keyword } = req.body;

  try {
    const newKeyword = new Keyword({
      keyword
    });

    const keywordObj = await newKeyword.save();
    res.json(keywordObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir tous les mots-clefs
router.get('/', async (req, res) => {
  try {
    const keywords = await Keyword.find();
    res.json(keywords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Obtenir un mot-clef grâce à son id
router.get('/:id', async (req, res) => {
  try {
    const keyword = await Keyword.findById(req.params.id);
    if (!keyword) return res.status(404).json({ msg: 'Mot-clef inconnu' });
    res.json(keyword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Met à jour un mot-clef grâce à son id
router.put('/:id', auth, async (req, res) => {
  const { keyword } = req.body;

  try {
    let keywordObj = await Keyword.findById(req.params.id);
    if (!keywordObj) return res.status(404).json({ msg: 'Mot-clef inconnu' });

    keywordObj.keyword = keyword;

    await keywordObj.save();
    res.json(keywordObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Supprimer un mot-clef grâce à son id
router.delete('/:id', auth, async (req, res) => {
  try {
    let keyword = await Keyword.findById(req.params.id);
    if (!keyword) return res.status(404).json({ msg: 'Mot-clef inconnu' });

    await keyword.remove();
    res.json({ msg: 'Mot-clef supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
