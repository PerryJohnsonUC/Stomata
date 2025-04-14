const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaTIuYXJkdWluby5jYy9pb3QiLCJhenAiOiJvV2ZHTVFKV2JteWE4NGF1TnB1SHJ1RHVBVXFMeXYyciIsImV4cCI6MTc0NDY3NDg0NCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiaHR0cDovL2FyZHVpbm8uY2MvY2xpZW50X2lkIjoiZ3JlZW4tdG9vbGtpdC1rZXkiLCJodHRwOi8vYXJkdWluby5jYy9pZCI6IjZkOGY1Yzk1LTBlY2QtNDQyNi05NTg3LTY4ZWI1NTdkMDYyYiIsImh0dHA6Ly9hcmR1aW5vLmNjL3JhdGVsaW1pdCI6MTAsImh0dHA6Ly9hcmR1aW5vLmNjL3VzZXJuYW1lIjoibW9udG95bWwiLCJpYXQiOjE3NDQ2NzQ1NDQsInN1YiI6Im9XZkdNUUpXYm15YTg0YXVOcHVIcnVEdUFVcUx5djJyQGNsaWVudHMifQ.Pn0QPPq-irCnBDLEbTQyTtlV7SY93s7V_h6lb0R3OA4'; // <== paste your real token here

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
