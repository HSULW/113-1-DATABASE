const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: String,
    sport: String,
    team: String,
    score: Number
});

module.exports = mongoose.model('Participant', participantSchema);
