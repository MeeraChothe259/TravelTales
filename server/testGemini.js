require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    try {
        console.log("Checking API Key:", process.env.GEMINI_API_KEY ? "Found" : "NOT FOUND");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // This is a dummy call to see if we can reach the API
        console.log("Fetching models...");
        // The SDK doesn't have a direct listModels yet in all versions, 
        // so we'll try a generic fetch or a known model.

        const models = ["gemini-pro", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];

        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("test");
                console.log(`✅ Model ${m} is available!`);
                process.exit(0);
            } catch (e) {
                console.log(`❌ Model ${m} failed: ${e.message}`);
            }
        }
    } catch (err) {
        console.error("Fatal Error:", err.message);
    }
}

listModels();
