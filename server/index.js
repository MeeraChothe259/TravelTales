const express = require('express');
const cors = require('cors');
const { generateMockPlan } = require('./mockAI');

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('TravelTales API is running!');
});

// Routes
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

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    console.error("SERVER ERROR:", err);
});

// Keeping the process alive explicitly if needed (though listen should do it)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
