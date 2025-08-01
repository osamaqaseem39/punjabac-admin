const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { title, description, featuredImage, gallery, category, compatibleBrands, autoCompanies, featured, benefits } = req.body;
    const product = new Product({ 
      title, 
      description, 
      featuredImage: featuredImage || '', 
      gallery: gallery || [], 
      category, 
      compatibleBrands: compatibleBrands || [],
      autoCompanies, 
      featured: featured || false,
      benefits: benefits || []
    });
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
    const { title, description, featuredImage, gallery, category, compatibleBrands, autoCompanies, featured, benefits } = req.body;
    const updateData = { 
      title, 
      description, 
      featuredImage: featuredImage || '', 
      gallery: gallery || [], 
      category, 
      compatibleBrands: compatibleBrands || [],
      autoCompanies, 
      featured: featured || false,
      benefits: benefits || []
    };
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
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.brand) filter.compatibleBrands = req.query.brand;
    const products = await Product.find(filter).sort({ createdAt: -1 }).populate('category').populate('compatibleBrands').populate('benefits');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('benefits');
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

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate('category').populate('compatibleBrands').populate('benefits');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get products by brand
exports.getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const products = await Product.find({ brand: brandId }).populate('category').populate('brand').populate('benefits');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 