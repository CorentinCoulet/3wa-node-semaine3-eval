const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  supplier: { type: String, required: true },
  description: { type: String, required: false }
});

module.exports = mongoose.model('Material', MaterialSchema);