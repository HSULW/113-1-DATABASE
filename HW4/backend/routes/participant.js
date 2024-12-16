const express = require('express');
const Participant = require('../models/participant');
const router = express.Router();

// Get all participants
router.get('/:id', async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }
        res.json(participant);
    } catch (error) {
        console.error('Error fetching participant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Existing routes
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
/*router.put('/:id', async (req, res) => {
    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedParticipant);
});*/

router.put('/participants/:id', async (req, res) => {
    try {
        const updatedParticipant = await Participant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedParticipant) {
            return res.status(404).json({ error: 'Participant not found' });
        }
        console.log('Updated Participant:', updatedParticipant); // 確認日誌
        res.json(updatedParticipant);
    } catch (error) {
        console.error('Error updating participant:', error); // 錯誤處理
        res.status(500).json({ error: 'Failed to update participant' });
    }
});

// Delete a participant
router.delete('/:id', async (req, res) => {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Participant deleted' });
});

module.exports = router;
