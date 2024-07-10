const User = require('../models/User');
const Statistic = require('../models/Statistic');

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const statistics = await Statistic.find({ user: req.user.id }).populate('furniture');

    res.render('dashboard', { user, statistics });
  } catch (err) {
    console.error('Erreur lors de la récupération du tableau de bord:', err.message);
    res.status(500).send('Erreur du serveur');
  }
};
