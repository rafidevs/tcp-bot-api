const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API endpoint to add friend
app.post('/add-friend', async (req, res) => {
    const targetUID = req.body.targetUID;

    if (!targetUID) {
        return res.status(400).json({ error: 'Target UID is required' });
    }

    const apiURL = `https://team-x-rahul-jwt.vercel.app/add-friend?uid=4204070629&password=8E33BCC7DEAE4194F1D3F8636F174D5C6C52C3363B2ED86519D7B9B074DE8381&target-uid=${targetUID}`;

    try {
        const response = await axios.get(apiURL);
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
