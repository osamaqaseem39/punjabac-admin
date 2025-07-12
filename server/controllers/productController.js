const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Handle file uploads
    let featuredImage = null;
    let gallery = [];
    
    if (req.files) {
      if (req.files.featuredImage && req.files.featuredImage[0]) {
        featuredImage = `/uploads/products/${req.files.featuredImage[0].filename}`;
      }
      
      if (req.files.gallery) {
        gallery = req.files.gallery.map(file => `/uploads/products/${file.filename}`);
      }
    } else {
      // Fallback for JSON payload with image URLs
      featuredImage = req.body.featuredImage || null;
      gallery = req.body.gallery || [];
    }
    
    const product = new Product({ title, description, featuredImage, gallery });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};

// Edit an existing product
exports.editProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Handle file uploads
    let featuredImage = null;
    let gallery = [];
    
    if (req.files) {
      if (req.files.featuredImage && req.files.featuredImage[0]) {
        featuredImage = `/uploads/products/${req.files.featuredImage[0].filename}`;
      }
      
      if (req.files.gallery) {
        gallery = req.files.gallery.map(file => `/uploads/products/${file.filename}`);
      }
    } else {
      // Fallback for JSON payload with image URLs
      featuredImage = req.body.featuredImage || null;
      gallery = req.body.gallery || [];
    }
    
    const updateData = { title, description, featuredImage, gallery };
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