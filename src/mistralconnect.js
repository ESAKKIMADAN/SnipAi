
import axios from 'axios';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const API_KEY = 'mistral_dummy_key_1234567890abcdef'; // 🔒 Dummy key

export const getSummaryFromMistral = async (transcript) => {
  try {
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: Summarize this meeting:\n${transcript} }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: Bearer ${API_KEY},
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Mistral API error:', error.message);
    return 'Failed to get summary.';
  }
};