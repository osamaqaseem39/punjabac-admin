const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.editCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);

module.exports = router; 