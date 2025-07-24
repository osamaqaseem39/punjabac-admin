const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand; 