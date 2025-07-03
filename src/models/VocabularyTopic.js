const mongoose = require('mongoose');

const vocabularyTopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  set: { type: mongoose.Schema.Types.ObjectId, ref: 'VocabularySet', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VocabularyTopic', vocabularyTopicSchema); 