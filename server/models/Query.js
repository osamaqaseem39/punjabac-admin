const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  details: { type: String, required: true },
  image: { type: String },
  subject: { type: String, enum: ['feedback', 'query'], required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', querySchema);
module.exports = Query; 