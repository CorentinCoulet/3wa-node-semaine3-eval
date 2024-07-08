const Material = require('../models/Material');

// Créer un nouveau matériau
const createMaterial = async (req, res) => {
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
};

// Obtenir tous les matériaux
const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Obtenir un matériau par son id
const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ msg: 'Matériau inconnu' });
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Mettre à jour un matériau par son id
const updateMaterialById = async (req, res) => {
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
};

// Supprimer un matériau par son id
const deleteMaterialById = async (req, res) => {
  try {
    let material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ msg: 'Matériau inconnu' });

    await material.remove();
    res.json({ msg: 'Matériau supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterialById,
  deleteMaterialById
};
