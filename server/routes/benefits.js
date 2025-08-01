const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefitController');

router.get('/', benefitController.getBenefits);
router.get('/type/:type', benefitController.getBenefitsByType);
router.get('/:id', benefitController.getBenefitById);
router.post('/', benefitController.createBenefit);
router.put('/:id', benefitController.updateBenefit);
router.delete('/:id', benefitController.deleteBenefit);

module.exports = router; 