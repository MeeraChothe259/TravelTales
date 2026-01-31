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
    res.send('TravelTales API is running!');
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

app.post('/api/generate-plan', (req, res) => {
    try {
        const formData = req.body;
        console.log("Received Request:", formData);

        // Simulate AI Delay (1.5 seconds)
        setTimeout(() => {
            const plan = generateMockPlan(formData);
            console.log("Successfully generated plan for:", formData.destination);
            res.json({ success: true, plan });
        }, 1500);

    } catch (error) {
        console.error("Error generating plan:", error);
        res.status(500).json({ success: false, message: "Failed to generate plan" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the process or use a different port.`);
        process.exit(1);
    } else {
        console.error("Server error:", err);
    }
});
