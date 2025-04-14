const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Replace this with your current Bearer token
const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaTIuYXJkdWluby5jYy9pb3QiLCJhenAiOiJvV2ZHTVFKV2JteWE4NGF1TnB1SHJ1RHVBVXFMeXYyciIsImV4cCI6MTc0NDY3NTA2MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiaHR0cDovL2FyZHVpbm8uY2MvY2xpZW50X2lkIjoiZ3JlZW4tdG9vbGtpdC1rZXkiLCJodHRwOi8vYXJkdWluby5jYy9pZCI6IjZkOGY1Yzk1LTBlY2QtNDQyNi05NTg3LTY4ZWI1NTdkMDYyYiIsImh0dHA6Ly9hcmR1aW5vLmNjL3JhdGVsaW1pdCI6MTAsImh0dHA6Ly9hcmR1aW5vLmNjL3VzZXJuYW1lIjoibW9udG95bWwiLCJpYXQiOjE3NDQ2NzQ3NjAsInN1YiI6Im9XZkdNUUpXYm15YTg0YXVOcHVIcnVEdUFVcUx5djJyQGNsaWVudHMifQ.oGLhhihs-rk2oOywwaW99BTGNB_J3yZ2fb6XAr6fhtk'; // 👈 paste full token here
const THING_ID = '890c6931-3f1a-41b3-8e3d-e0a7353157bf';

app.use(express.json());

app.post('/upload', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api2.arduino.cc/iot/v2/things/${THING_ID}/properties`,
      req.body,
      {
        headers: {
          'Authorization': BEARER_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Forwarded to Arduino Cloud' });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Forward failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}`);
});
