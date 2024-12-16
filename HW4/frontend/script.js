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

/*
document.getElementById('participant-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('participant-id').value;
    const name = document.getElementById('name').value;
    const sport = document.getElementById('sport').value;
    const team = document.getElementById('team').value;
    const score = document.getElementById('score').value;

    const participant = { name, sport, team, score };

    try {
        if (id) {
            console.log('Updating Participant with ID:', id); // 更新操作
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participant)
            });
        } else {
            console.log('Creating New Participant'); // 新增操作
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participant)
            });
        }

        document.getElementById('participant-form').reset(); // 清空表單
        fetchParticipants(); // 重新載入列表
    } catch (error) {
        console.error('Error saving participant:', error);
    }
});


async function editParticipant(id) {
    console.log('Edit Button Clicked:', id); // 確認按鈕被點擊

    try {
        // 取得該筆資料
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch participant with ID: ${id}`);
        }
        const participant = await response.json();
        console.log('Fetched Participant:', participant); // 確認取得的資料

        // 填充表單
        document.getElementById('participant-id').value = participant._id;
        document.getElementById('name').value = participant.name;
        document.getElementById('sport').value = participant.sport;
        document.getElementById('team').value = participant.team;
        document.getElementById('score').value = participant.score;

        // 提示使用者編輯該資料
        document.getElementById('form-title').innerText = 'Edit Participant';
        document.getElementById('name').focus(); // 將焦點設置在第一個欄位
    } catch (error) {
        console.error('Error editing participant:', error);
    }
}
*/

async function editParticipant(id) {
    console.log('Edit Button Clicked:', id);

    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch participant with ID: ${id}`);
        }
        const participant = await response.json();

        // 填充表單資料
        document.getElementById('participant-id').value = participant._id;
        document.getElementById('name').value = participant.name;
        document.getElementById('sport').value = participant.sport;
        document.getElementById('team').value = participant.team;
        document.getElementById('score').value = participant.score;

        // 更改表單標題
        document.getElementById('form-title').innerText = 'Edit Participant';
        document.getElementById('name').focus(); // 將焦點設置在第一個輸入框
    } catch (error) {
        console.error('Error editing participant:', error);
    }
}

document.getElementById('participant-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('participant-id').value;
    const name = document.getElementById('name').value;
    const sport = document.getElementById('sport').value;
    const team = document.getElementById('team').value;
    const score = document.getElementById('score').value;

    const participant = { name, sport, team, score };

    try {
        if (id) {
            console.log('Updating Participant with ID:', id);
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participant)
            });
        } else {
            console.log('Creating New Participant');
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participant)
            });
        }

        document.getElementById('participant-form').reset();
        document.getElementById('participant-id').value = ''; // 清除 id
        document.getElementById('form-title').innerText = 'Add New Participant'; // 恢復表單標題
        fetchParticipants();
    } catch (error) {
        console.error('Error saving participant:', error);
    }
});


async function deleteParticipant(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchParticipants();
}

async function deleteParticipant(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const result = await response.json();
    console.log('Delete Response:', result); // 日誌輸出刪除結果
    fetchParticipants();
}

async function saveParticipant(id) {
    const name = document.getElementById(`name-${id}`).value;
    const sport = document.getElementById(`sport-${id}`).value;
    const team = document.getElementById(`team-${id}`).value;
    const score = document.getElementById(`score-${id}`).value;

    const participant = { name, sport, team, score };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participant)
        });

        fetchParticipants(); // 重新載入表格
    } catch (error) {
        console.error('Error saving participant:', error);
    }
}


fetchParticipants();
