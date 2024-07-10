const Statistic = require('../models/Statistic');

// Créer une nouvelle statistique
const createStatistic = async (req, res) => {
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
};

// Obtenir toutes les statistiques
const getAllStatistics = async (req, res) => {
  try {
    const statistics = await Statistic.find().populate('user').populate('furniture');
    res.json(statistics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Obtenir une statistique par son id
const getStatisticById = async (req, res) => {
  try {
    const statistic = await Statistic.findById(req.params.id).populate('user').populate('furniture');
    if (!statistic) return res.status(404).json({ msg: 'Statistique inconnue' });
    res.json(statistic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Supprimer une statistique par son id
const deleteStatisticById = async (req, res) => {
  try {
    let statistic = await Statistic.findById(req.params.id);
    if (!statistic) return res.status(404).json({ msg: 'Statistique inconnue' });

    await statistic.remove();
    res.json({ msg: 'Statistique supprimée avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(code).send('Erreur du serveur');
  }
};

module.exports = {
  createStatistic,
  getAllStatistics,
  getStatisticById,
  deleteStatisticById
};
