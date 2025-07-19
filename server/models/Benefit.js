const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Benefit = mongoose.model('Benefit', benefitSchema);
module.exports = Benefit; 