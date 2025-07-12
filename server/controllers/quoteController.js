const Quote = require('../models/Quote');

// Get all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes.' });
  }
}; 