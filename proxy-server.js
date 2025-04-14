const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1...'; // <== paste your real token here

app.use(express.json());

app.post('/upload', async (req, res) => {
  try {
    const payload = req.body;

    const response = await axios.post(
      'https://api2.arduino.cc/iot/v2/things/890c6931-3f1a-41b3-8e3d-e0a7353157bf/properties',
      payload,
      {
        headers: {
          'Authorization': BEARER_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(response.status).json({ message: 'Forwarded to Arduino IoT Cloud' });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to forward request' });
  }
});

app.listen(port, () => {
  console.log(`Proxy running on http://localhost:${port}`);
});
