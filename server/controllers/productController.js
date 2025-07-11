const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    const featuredImage = req.files['featuredImage'] ? req.files['featuredImage'][0].path : null;
    const gallery = req.files['gallery'] ? req.files['gallery'].map(f => f.path) : [];
    const product = new Product({ title, description, featuredImage, gallery });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit an existing product
exports.editProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };
    if (req.files['featuredImage']) {
      updateData.featuredImage = req.files['featuredImage'][0].path;
    }
    if (req.files['gallery']) {
      updateData.gallery = req.files['gallery'].map(f => f.path);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 