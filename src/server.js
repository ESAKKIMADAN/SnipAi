
const express = require('express');
const axios = require('axios');
const app = express();

const MEETSTREAM_BASE_URL = 'https://api-meetstream-tst-hackathon.meetstream.ai';
const MEETSTREAM_API_KEY = 'meetstream_dummy_token_abcdef123456';

app.use(express.json());

app.post('/create-bot', async (req, res) => {
  try {
    const { meeting_url } = req.body;

    const response = await axios.post(
      ${MEETSTREAM_BASE_URL}/bot/create/,
      { meeting_url },
      {
        headers: {
          Authorization: Token ${MEETSTREAM_API_KEY},
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ bot_id: response.data.bot_id });
  } catch (error) {
    console.error('MeetStream create bot error:', error.message);
    res.status(500).json({ error: 'Bot creation failed' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});