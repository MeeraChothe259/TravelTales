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

const { generateRealPlan } = require('./geminiService');


// Routes
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
