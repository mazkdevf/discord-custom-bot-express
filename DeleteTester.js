const fetch = require('node-fetch');

const API_URL = 'http://localhost:3000';
const BOT_TOKEN = '';
const USER_ID = '1234567890';

async function deleteBot() {
  try {
    const response = await fetch(`${API_URL}/api/v1/bots/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ botToken: BOT_TOKEN, userId: USER_ID }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(`Failed to delete bot: ${data.message}`);
    }
  } catch (error) {
    console.error('Error occurred during the request:', error);
  }
}

deleteBot();
