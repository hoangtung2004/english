const mongoose = require('mongoose');

const irregularVerbSchema = new mongoose.Schema({
    v1: { type: String, required: true },
    v2: { type: String, required: true },
    v3: { type: String, required: true },
    meaning: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IrregularVerb', irregularVerbSchema); 