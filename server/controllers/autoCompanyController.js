const AutoCompany = require('../models/AutoCompany');

// Get all auto companies
exports.getAll = async (req, res) => {
  try {
    const companies = await AutoCompany.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single auto company by ID
exports.getById = async (req, res) => {
  try {
    const company = await AutoCompany.findById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new auto company
exports.create = async (req, res) => {
  try {
    const { name, image } = req.body;
    const exists = await AutoCompany.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Name already exists' });
    const company = new AutoCompany({ name, image });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update auto company
exports.update = async (req, res) => {
  try {
    const { name, image } = req.body;
    const company = await AutoCompany.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ error: 'Not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete auto company
exports.remove = async (req, res) => {
  try {
    const company = await AutoCompany.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 