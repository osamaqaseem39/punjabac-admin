const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.post('/', brandController.addBrand);
router.put('/:id', brandController.editBrand);
router.delete('/:id', brandController.deleteBrand);
router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrand);

module.exports = router; 