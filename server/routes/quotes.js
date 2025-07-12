const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// GET /quotes - fetch all quotes
router.get('/', quoteController.getAllQuotes);

module.exports = router; 