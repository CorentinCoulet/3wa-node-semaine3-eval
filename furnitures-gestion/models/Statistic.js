const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  furniture: { type: Schema.Types.ObjectId, ref: 'Furniture', required: true },
  action: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Statistic', StatisticSchema);
