const API_URL = 'http://localhost:5000/participants';

async function fetchParticipants() {
    const response = await fetch(API_URL);
    const participants = await response.json();

    const tableBody = document.querySelector('#participant-table tbody');
    tableBody.innerHTML = '';
    participants.forEach(participant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${participant.name}</td>
            <td>${participant.sport}</td>
            <td>${participant.team}</td>
            <td>${participant.score}</td>
            <td>
                <button onclick="editParticipant('${participant._id}')">Edit</button>
                <button onclick="deleteParticipant('${participant._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('participant-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('participant-id').value;
    const name = document.getElementById('name').value;
    const sport = document.getElementById('sport').value;
    const team = document.getElementById('team').value;
    const score = document.getElementById('score').value;

    const participant = { name, sport, team, score };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participant)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participant)
        });
    }

    document.getElementById('participant-form').reset();
    fetchParticipants();
});

async function editParticipant(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const participant = await response.json();

    document.getElementById('participant-id').value = participant._id;
    document.getElementById('name').value = participant.name;
    document.getElementById('sport').value = participant.sport;
    document.getElementById('team').value = participant.team;
    document.getElementById('score').value = participant.score;
}

async function deleteParticipant(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchParticipants();
}

fetchParticipants();
