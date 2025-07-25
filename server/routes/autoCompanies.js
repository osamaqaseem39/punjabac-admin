const express = require('express');
const router = express.Router();
const autoCompanyController = require('../controllers/autoCompanyController');

router.get('/', autoCompanyController.getAll);
router.get('/:id', autoCompanyController.getById);
router.post('/', autoCompanyController.create);
router.put('/:id', autoCompanyController.update);
router.delete('/:id', autoCompanyController.remove);

module.exports = router; 