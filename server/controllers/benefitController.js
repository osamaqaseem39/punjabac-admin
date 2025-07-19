const Benefit = require('../models/Benefit');

// Create a new benefit
exports.createBenefit = async (req, res) => {
  try {
    const benefit = new Benefit(req.body);
    await benefit.save();
    res.status(201).json(benefit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all benefits
exports.getBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find();
    res.json(benefits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a benefit by ID
exports.getBenefitById = async (req, res) => {
  try {
    const benefit = await Benefit.findById(req.params.id);
    if (!benefit) return res.status(404).json({ error: 'Benefit not found' });
    res.json(benefit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a benefit
exports.updateBenefit = async (req, res) => {
  try {
    const benefit = await Benefit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!benefit) return res.status(404).json({ error: 'Benefit not found' });
    res.json(benefit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a benefit
exports.deleteBenefit = async (req, res) => {
  try {
    const benefit = await Benefit.findByIdAndDelete(req.params.id);
    if (!benefit) return res.status(404).json({ error: 'Benefit not found' });
    res.json({ message: 'Benefit deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 