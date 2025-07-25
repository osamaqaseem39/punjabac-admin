const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefitController');

router.get('/', benefitController.getAll);
router.get('/:id', benefitController.getById);
router.post('/', benefitController.create);
router.put('/:id', benefitController.update);
router.delete('/:id', benefitController.remove);

module.exports = router; 