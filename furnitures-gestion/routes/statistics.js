const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');
const auth = require('../middleware/auth');

router.post('/', auth, statisticController.createStatistic);
router.get('/', auth, statisticController.getAllStatistics);
router.get('/:id', auth, statisticController.getStatisticById);
router.delete('/:id', auth, statisticController.deleteStatisticById);

module.exports = router;
