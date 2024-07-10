const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, createCategory);
router.get('/', auth, getAllCategories);
router.get('/:id', auth, getCategoryById);
router.put('/:id', auth, updateCategoryById);
router.delete('/:id', auth, deleteCategoryById);

module.exports = router;
