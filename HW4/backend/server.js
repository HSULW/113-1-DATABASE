const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Participant = require('./models/participant'); // 引入 Participant 模型

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/sports_meet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
const participantRoutes = require('./routes/participant');
app.use('/participants', participantRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/participants', async (req, res) => {
    const newParticipant = new Participant(req.body);
    const result = await newParticipant.save();
    console.log('Created:', result); // 確認 Create 操作
    res.json(result);
});

app.put('/participants/:id', async (req, res) => {
    const updatedParticipant = await Participant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    console.log('Updated:', updatedParticipant); // 新增日誌
    res.json(updatedParticipant);
});


app.delete('/participants/:id', async (req, res) => {
    const result = await Participant.findByIdAndDelete(req.params.id);
    console.log('Deleted:', result); // 確認 Delete 操作
    res.json({ message: 'Participant deleted' });
});

