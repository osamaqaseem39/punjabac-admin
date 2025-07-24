const Brand = require('../models/Brand');

// Add a new brand
exports.addBrand = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const brand = new Brand({ name, image, description });
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit an existing brand
exports.editBrand = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, image, description },
      { new: true }
    );
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single brand
exports.getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 