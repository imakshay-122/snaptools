import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import instagramRouter from './routes/instagram';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const app = express();

// Routes
app.use('/api/instagram', instagramRouter);
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const JDOODLE_API_URL = 'https://api.jdoodle.com/v1/execute';

// Verify API configuration
console.log('Checking JDoodle API configuration...');
console.log(`API URL: ${JDOODLE_API_URL}`);
console.log(`Client ID exists: ${Boolean(process.env.VITE_JDOODLE_CLIENT_ID)}`);
console.log(`Client Secret exists: ${Boolean(process.env.VITE_JDOODLE_CLIENT_SECRET)}`);

const CLIENT_ID = process.env.VITE_JDOODLE_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_JDOODLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('JDoodle API credentials are not properly configured');
  process.exit(1);
}

app.post('/api/execute', async (req, res) => {
  try {
    const { code, language, input } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Missing required parameters: code and language are required' });
    }

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error('JDoodle API credentials are not properly configured');
    }

    // Validate API connection before executing code
    try {
      await axios.get('https://api.jdoodle.com/v1/credit-spent', {
        params: { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }
      });
    } catch (apiError) {
      console.error('JDoodle API connection test failed:', apiError);
      throw new Error('Unable to connect to JDoodle API: Please check your network connection and API credentials');
    }

    const response = await axios.post(
      JDOODLE_API_URL,
      {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        script: code,
        language,
        stdin: input
      },
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        res.status(504).json({ error: 'Request timeout: The API server took too long to respond' });
      } else if (!error.response) {
        res.status(502).json({ error: 'Network error: Unable to connect to the JDoodle API' });
      } else {
        res.status(error.response.status || 500).json({
          error: `API Error: ${error.response?.data?.error || error.message}`
        });
      }
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});