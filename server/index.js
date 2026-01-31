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

const { generateRealPlan } = require('./geminiService');


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

app.post('/api/generate-plan', async (req, res) => {
    const formData = req.body;
    console.log("Received AI Plan Request for:", formData.destination);
    try {
        // 1. Try Real AI Generation
        const plan = await generateRealPlan(formData);
        console.log("✅ Successfully generated REAL plan for:", formData.destination);
        res.json({ success: true, plan });

    } catch (realAiError) {
        console.warn("⚠️ Real AI failed or key missing, falling back to Mock AI:", realAiError.message);

        // 2. Fallback to Mock AI
        try {
            setTimeout(() => {
                try {
                    const plan = generateMockPlan(formData);
                    console.log("ℹ️ Generated MOCK plan for:", formData.destination);
                    res.json({ success: true, plan });
                } catch (mockError) {
                    console.error("❌ Mock generation error:", mockError);
                    res.status(500).json({ success: false, message: "Critical failure in plan generation" });
                }
            }, 1000);
        } catch (err) {
            res.status(500).json({ success: false, message: "System error" });
        }
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
