require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateMockPlan, handleChatResponse } = require('./mockAI');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('TravelTales API v2 is running!');
});

// Routes
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Chat Request:", message);

        const reply = await handleChatResponse(message);
        res.json({ reply });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ success: false, message: "AI Assistant is resting..." });
    }
});

app.get('/api/geocode', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Query parameter 'q' is missing" });

        console.log("Geocoding Request for:", q);

        // Using built-in fetch (Node 18+) or a fallback
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`, {
            headers: {
                'User-Agent': 'TravelTales/1.0 (contact: support@traveltales.ai)'
            }
        });

        if (!response.ok) {
            throw new Error(`Nominatim error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Geocoding Error:", error);
        res.status(500).json({ success: false, message: "Geocoding failed", details: error.message });
    }
});

app.post('/api/generate-plan', (req, res) => {
    try {
        const formData = req.body;
        console.log("Received Request:", formData);

        // Simulate AI Delay (1.5 seconds)
        setTimeout(() => {
            try {
                const plan = generateMockPlan(formData);
                console.log("Successfully generated plan for:", formData.destination);
                res.json({ success: true, plan });
            } catch (err) {
                console.error("Internal simulation error:", err);
                res.status(500).json({ success: false, message: "Error during plan generation" });
            }
        }, 1500);

    } catch (error) {
        console.error("Error generating plan:", error);
        res.status(500).json({ success: false, message: "Failed to generate plan" });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the process or use a different port.`);
        process.exit(1);
    } else {
        console.error("Server error:", err);
    }
});

server.on('error', (err) => {
    console.error("SERVER ERROR:", err);
});

// Keeping the process alive explicitly if needed (though listen should do it)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
