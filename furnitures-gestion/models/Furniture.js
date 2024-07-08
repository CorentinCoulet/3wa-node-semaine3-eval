const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: { type: Number, required: true },
  materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
  keywords: [{ type: Schema.Types.ObjectId, ref: 'Keyword' }]
});

module.exports = mongoose.model('Furniture', FurnitureSchema);
