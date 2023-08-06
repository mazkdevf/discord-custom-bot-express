const fetch = require('node-fetch');

const API_ENDPOINT = 'http://localhost:3000/api/v1/bots/create'; 


const botDetails = {
  botName: 'TestingBot#0000',
  clientId: '',
  botToken: '',
  botSecret: '',
  userId: '', 
};

async function createBot() {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botDetails),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Bot created successfully:', data.message);
    } else {
      console.log('Error creating bot:', data.message);
    }
  } catch (error) {
    console.error('Error sending POST request:', error.message);
  }
}

createBot();
