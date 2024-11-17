const express = require('express');
const Participant = require('../models/participant');
const router = express.Router();

// Get all participants
router.get('/', async (req, res) => {
    const participants = await Participant.find();
    res.json(participants);
});

// Add a new participant
router.post('/', async (req, res) => {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.json(newParticipant);
});

// Update a participant
router.put('/:id', async (req, res) => {
    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedParticipant);
});

// Delete a participant
router.delete('/:id', async (req, res) => {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Participant deleted' });
});

module.exports = router;
