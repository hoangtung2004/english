const mongoose = require('mongoose');

const irregularVerbSchema = new mongoose.Schema({
    baseForm: { type: String, required: true },
    pastSimple: { type: String, required: true },
    pastParticiple: { type: String, required: true },
    meaning: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IrregularVerb', irregularVerbSchema); 