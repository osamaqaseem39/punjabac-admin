const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  benefits: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the service
 *         title:
 *           type: string
 *           description: The title of the service
 *         description:
 *           type: string
 *           description: The description of the service
 *         featuredImage:
 *           type: string
 *           description: The featured image URL
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           description: List of benefits for the service
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service; 