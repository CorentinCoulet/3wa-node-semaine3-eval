const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: { type: Number, required: true },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true }],
  keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword', required: true }],
});

module.exports = mongoose.model('Furniture', FurnitureSchema);
