const express = require('express');
const cors = require('cors');
const { generateMockPlan } = require('./mockAI');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/generate-plan', (req, res) => {
    try {
        const formData = req.body;
        console.log("Received Request:", formData);

        // Simulate AI Delay (1.5 seconds)
        setTimeout(() => {
            const plan = generateMockPlan(formData);
            res.json({ success: true, plan });
        }, 1500);

    } catch (error) {
        console.error("Error generating plan:", error);
        res.status(500).json({ success: false, message: "Failed to generate plan" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
