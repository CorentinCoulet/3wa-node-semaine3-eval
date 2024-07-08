const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Récupérer le token du header HTTP
  const token = req.header('x-auth-token');

  // Vérifier s'il y a un token
  if (!token) {
    return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur décodé à la requête
    req.user = await User.findById(decoded.user.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token non valide' });
  }
};
