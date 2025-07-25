const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    default: null
  },
  gallery: [{
    type: String
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  autoCompanies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AutoCompany',
    required: false
  }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 