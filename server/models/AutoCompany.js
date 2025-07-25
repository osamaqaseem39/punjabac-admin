const mongoose = require('mongoose');

const autoCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('AutoCompany', autoCompanySchema); 