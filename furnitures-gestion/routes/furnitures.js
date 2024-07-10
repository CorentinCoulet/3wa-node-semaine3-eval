const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');
const auth = require('../middleware/auth');

router.post('/', auth, furnitureController.createFurniture);
router.get('/:id', auth, furnitureController.getFurnitureById);

module.exports = router;
