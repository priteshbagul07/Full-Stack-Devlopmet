const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['car', 'bike'], required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: 'https://picsum.photos/id/1015/800/600' }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);