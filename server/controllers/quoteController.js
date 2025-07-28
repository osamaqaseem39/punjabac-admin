const Query = require('../models/Query');

// Create a new query
exports.createQuery = async (req, res) => {
  try {
    const { name, email, phone, details, image } = req.body;
    if (!name || !email || !phone || !details) {
      return res.status(400).json({ error: 'All fields except image are required.' });
    }
    const query = new Query({ name, email, phone, details, image });
    await query.save();
    res.status(201).json({ success: true, query });
  } catch (err) {
    console.error('Create query error:', err);
    res.status(500).json({ error: 'Failed to create query.' });
  }
};

// Get all querys
exports.getQueries = async (req, res) => {
  try {
    const querys = await Query.find().sort({ createdAt: -1 });
    res.json(querys);
  } catch (err) {
    console.error('Get querys error:', err);
    res.status(500).json({ error: 'Failed to fetch querys.' });
  }
};

// Update query status
exports.updateQueryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'in_progress', 'completed', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }
    const query = await Query.findByIdAndUpdate(id, { status }, { new: true });
    if (!query) return res.status(404).json({ error: 'Query not found.' });
    res.json({ success: true, query });
  } catch (err) {
    console.error('Update query status error:', err);
    res.status(500).json({ error: 'Failed to update query status.' });
  }
}; 