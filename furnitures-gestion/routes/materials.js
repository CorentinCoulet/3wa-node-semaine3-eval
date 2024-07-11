const express = require('express');
const router = express.Router();
const { 
    createMaterial, 
    getAllMaterials, 
    getMaterialById, 
    updateMaterialById, 
    deleteMaterialById,
    getMaterialDetailsById
} = require('../controllers/materialController');
const auth = require('../middleware/auth');

router.post('/', auth, createMaterial);
router.get('/', auth, getAllMaterials);
router.get('/:id', auth, getMaterialById);
router.put('/:id', auth, updateMaterialById);
router.delete('/:id', auth, deleteMaterialById);
router.get('/:id/details', auth, getMaterialDetailsById);

module.exports = router;
