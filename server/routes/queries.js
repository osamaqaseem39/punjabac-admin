const express = require('express');
const router = express.Router();
const { createQuery, getQueries, updateQueryStatus } = require('../controllers/quoteController');

// POST /api/queries - create a new query
router.post('/', createQuery);

// GET /api/queries - get all queries
router.get('/', getQueries);

// PATCH /api/queries/:id - update query status
router.patch('/:id', updateQueryStatus);

module.exports = router; 