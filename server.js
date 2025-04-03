const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const app = express();
const PORT = 3000;

const CLIENT_ID = '693363898999-dd7ujp8tvn4gqslte7jdlgimf0rcdtj2.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.use(cors());
app.use(express.json());

app.post('/api/verify-token', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        res.json({ 
            success: true, 
            user: {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid token' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));