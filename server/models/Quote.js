const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  details: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema); 