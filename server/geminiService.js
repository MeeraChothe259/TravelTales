const Groq = require("groq-sdk");
const axios = require("axios");
require("dotenv").config();
const { fetchDestinationImage } = require('./imageService');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const fetchWeather = async (city) => {
    try {
        if (!process.env.OPENWEATHER_API_KEY) return null;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
        return {
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            timezone: response.data.timezone
        };
    } catch (error) {
        console.error("Weather fetch failed:", error.message);
        return null;
    }
};

const fetchExchangeRate = async (base, target) => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
        return response.data.rates[target] || null;
    } catch (error) {
        console.error("Exchange rate fetch failed:", error.message);
        return null;
    }
};

const generateRealPlan = async (data) => {
    const { destination, startDate, endDate, partners, mood, budget, preferences, travelerCount, language = 'en' } = data;

    // No specific model init needed here for Groq until call

    const currentDate = new Date().toDateString();

    const prompt = `
        Generate a highly detailed travel itinerary for ${destination} from ${startDate} to ${endDate}.
        Travelers: ${travelerCount} (${partners}). Vibe: ${mood}. Budget: ${budget} (1=Low, 2=Medium, 3=Premium).
        Interests: ${preferences.join(", ")}.
        Language: ${language}.
        ${data.weather ? `Current Real-time Weather: ${data.weather.description}, ${data.weather.temp}°C (Use this to subtly influence the 'weatherMood' and itinerary activities)` : ''}

        You are an expert Local Travel Guide for ${destination}. 
            CURRENT DATE: ${currentDate}.
            
            GENERATE A REAL - TIME, HIGHLY DETAILED ITINERARY.
            STRICT RULES:
    1. DO NOT fabricate places.All hotels, restaurants, and hidden gems MUST BE REAL, EXISTENT places.
            2. Use "Live Context": Mention if a place is closed or busy based on the current date / season.
            3. "localIntelligence": Provide ACTUAL local transport tips(e.g., "Use Suica card", "Uber is expensive here") and specific safety advice.
            
            Response must be a valid JSON object matching this EXACT structure:
    {
        "tripName": "A catchy name for the trip",
            "destination": "${destination}",
                "destinationCoords": { "lat": number, "lng": number },
        "dates": "${startDate} to ${endDate}",
            "travelers": "${partners}",
                "vibe": "${mood}",
                    "culturalScore": number,
                        "homeCurrency": { "code": "string", "name": "string", "symbol": "string" },
        "budgetSummary": { "total": number, "perPerson": number, "level": "text", "currency": "USD" },
        "budgetDetails": {
            "totalEstimated": number,
                "targetDaily": number,
                    "currency": "USD",
                        "level": "text",
                            "travelers": ${travelerCount},
            "dayWise": [{ "day": number, "activities": number, "overhead": number, "total": number, "target": number, "overspendPercent": number }]
        },
        "itinerary": [
            {
                "day": number,
                "date": "actual date",
                "weather": "e.g. Sunny 25°C",
                "weatherMood": "A poetic/atmospheric vibe description (e.g., 'Perfect for bookstores & jazz cafes')",
                "wakeup": { "title": "Morning Routine", "type": "Personal", "time": "7:00 AM - 8:00 AM", "duration": "1h", "cost": "Free", "description": "string" },
                "breakfast": { "title": "string", "type": "Meal", "time": "8:00 AM - 9:30 AM", "duration": "string", "cost": "string", "description": "string", "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" } },
                "morning": {
                    "title": "REAL Place Name", "type": "string", "time": "10:00 AM - 1:00 PM", "duration": "string", "travelTime": "string",
                    "cost": "string with currency symbol", "opening": "e.g. 9:00 AM", "closing": "e.g. 5:00 PM", "holidays": "string",
                    "warnings": "Real-time warning (e.g. Construction, Crowded)", "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string",
                    "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" },
                    "coords": { "lat": number, "lng": number },
                    "culturalWarnings": { "dress": "string", "photography": "string", "behavior": "string" }
                },
                "lunch": { "title": "REAL Restaurant Name", "type": "Meal", "time": "1:00 PM - 2:30 PM", "duration": "string", "cost": "string", "description": "string", "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" } },
                "afternoon": { 
                    "title": "REAL Activity", "type": "string", "time": "3:00 PM - 6:00 PM", "duration": "string", "cost": "string", "travelTime": "string",
                    "opening": "e.g. 9:00 AM", "closing": "e.g. 5:00 PM", "warnings": "string",
                    "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string", 
                    "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" }, 
                    "coords": { "lat": number, "lng": number }, 
                    "culturalWarnings": { "dress": "string", "photography": "string", "behavior": "string" } 
                },
                "evening": { 
                    "title": "REAL Activity", "type": "string", "time": "6:30 PM - 8:00 PM", "duration": "string", "cost": "string", "travelTime": "string",
                    "opening": "e.g. 9:00 AM", "closing": "e.g. 5:00 PM", "warnings": "string",
                    "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string", 
                    "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" }, 
                    "coords": { "lat": number, "lng": number }, 
                    "culturalWarnings": { "dress": "string", "photography": "string", "behavior": "string" } 
                },
                "dinner": { "title": "REAL Restaurant", "type": "Meal", "time": "8:30 PM - 10:30 PM", "duration": "string", "cost": "string", "description": "string", "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" } }
            }
        ],
            "highlights": ["string"],
                "liveContext": {
            "news": [{ "title": "string", "source": "string", "relevance": "string" }],
                "events": [{ "name": "string", "date": "string", "description": "string" }],
                    "safetyAlert": "Current safety level or specific alert"
        },
        "localIntelligence": {
            "food": { "specialties": ["string"], "restaurants": [{ "name": "REAL Name", "type": "string", "price": "e.g. $", "tags": ["string"], "coords": { "lat": number, "lng": number } }] },
            "transport": { "routes": ["string"], "passes": ["string"], "contacts": [{ "type": "string", "name": "string", "contact": "string" }], "hubs": [{ "name": "string", "coords": { "lat": number, "lng": number } }] },
            "rental": { "contacts": [{ "type": "string", "name": "string", "contact": "string" }], "options": ["string"] },
            "guides": [{ "name": "string", "languages": ["string"], "rating": number, "specialty": "string" }]
        },
        "hotelSuggestions": [
            {
                "id": "unique string",
                "name": "REAL Hotel Name",
                "description": "string",
                "pricePerNight": number,
                "rating": number,
                "amenities": ["string"],
                "roomTypes": ["string"],
                "location": "string",
                "coords": { "lat": number, "lng": number },
                "imageUrl": "string placeholder or keyword for search",
                "phone": "Real phone number",
                "address": "Real address"
            }
        ],
                "hiddenGems": [
                {
                    "id": "unique string",
                    "title": "REAL Hidden Gem Name",
                    "description": "string",
                    "whyUnderrated": "string",
                    "coords": { "lat": number, "lng": number }
                }
            ],
                "vlogs": [
                    {
                        "id": "string (unique)",
                        "title": "string (Real vlog title)",
                        "youtuber": "string (Real creator name)",
                        "url": "https://www.youtube.com/watch?v=VIDEO_ID",
                        "thumbnail": "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg"
                    }
                ]
    }

    IMPORTANT:
    - For "hotelSuggestions", USE THE SEARCH TOOL to find 2-3 REAL hotels located EXACTLY in ${destination}. 
    - VERIFY the hotel address. Do NOT suggest hotels in neighboring cities or regions.
    - For vlogs, USE THE SEARCH TOOL to find 2 REAL, high-quality YouTube videos specifically about ${destination}.
    - For hiddenGems, USE THE SEARCH TOOL to find 2 REAL authentic spots in ${destination}.
    - For smartAlternatives, provide SPECIFIC, CREATIVE, and ACTIONABLE suggestions:
    - "late": Suggest rescheduling with exact times, transportation tips, and time - saving hacks
        - "skipped": Recommend nearby alternatives with descriptions, distances, and why locals love them
            - "overspent": Provide budget - friendly swaps with cost comparisons and authentic local experiences

                - "culturalScore": A score from 0 - 100 indicating how well the itinerary aligns with ${destination} 's local customs, religious norms, and social etiquette.
                    - "culturalWarnings": For each activity, specify guidelines for "dress"(clothing norms), "photography"(camera rules), and "behavior"(social taboos).Only populate these if they are SIGNIFICANT or UNUSUAL for that specific spot.

                        Examples:
        - late: "Start with breakfast at Café Luna (5 min walk), then taxi to the museum by 11 AM. Skip the gift shop to save 20 mins!"
            - skipped: "Visit the artisan market 10 mins away - live music, street food, handmade crafts. Locals' favorite spot!"
                - overspent: "Join the free walking tour (tips-based, every 2 hours). Pack a picnic from the market - save $30 and eat like a local!"

            Be realistic with costs.Use local currency converted to USD for budgetSummary. 
            Ensure all text is in the requested language(${language}).
            Return ONLY the JSON object.No markdown, no preamble.
        `;

    try {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("Missing Groq API Key");
        }

        console.log("🚀 Calling Groq API for plan generation...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a professional travel planner. You MUST respond ONLY with valid JSON. Do not include any markdown formatting like ```json or any other text outside the JSON object."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        let text = chatCompletion.choices[0]?.message?.content || "";

        // Clean markdown if AI includes it
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const plan = JSON.parse(text);
        console.log("✅ JSON parsed successfully.");

        // Enhance with real weather and images
        console.log("🌥️ Fetching weather and destination images...");
        const [liveWeather, destImage] = await Promise.all([
            fetchWeather(destination),
            fetchDestinationImage(destination)
        ]);

        if (liveWeather) {
            if (plan.itinerary && plan.itinerary[0]) {
                plan.itinerary[0].weather = `${liveWeather.temp}°C, ${liveWeather.description}`;
            }
            plan.timezone = liveWeather.timezone;
        }

        // Fetch Real-time Exchange Rate
        if (plan.homeCurrency?.code && plan.homeCurrency.code !== 'USD') {
            const rate = await fetchExchangeRate('USD', plan.homeCurrency.code);
            if (rate) plan.exchangeRate = rate;
        }

        // Fetch Images for Hotels
        if (plan.hotelSuggestions && plan.hotelSuggestions.length > 0) {
            await Promise.all(plan.hotelSuggestions.map(async (hotel) => {
                const hotelImg = await fetchDestinationImage(`${hotel.name} ${destination}`);
                if (hotelImg) hotel.imageUrl = hotelImg;
            }));
        }

        plan.coverImage = destImage;

        // Fallback for Hidden Gems if AI misses it
        if (!plan.hiddenGems || plan.hiddenGems.length === 0) {
            plan.hiddenGems = [
                {
                    title: `The Secret Garden of ${destination}`,
                    description: "A beautiful, nearly forgotten corner of the city where locals find peace. Perfect for a quiet afternoon.",
                    whyUnderrated: "It's hidden in plain sight behind a historic library and rarely makes it into guidebooks.",
                    coords: plan.destinationCoords || { lat: 0, lng: 0 },
                    imageUrl: ""
                },
                {
                    title: "Local Artisanal Alley",
                    description: "A vibrant but narrow street filled with craftsmen, vintage record stores, and the best local coffee.",
                    whyUnderrated: "Too small for tour buses, this street preserves the authentic vibe of the neighborhood.",
                    coords: plan.destinationCoords || { lat: 0, lng: 0 },
                    imageUrl: ""
                }
            ];
        }

        return plan;
    } catch (error) {
        console.error("Groq API Error:", error);
        throw error;
    }
};

const analyzeFeedback = async (text) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Analyze travel feedback. Respond ONLY with valid JSON."
                },
                {
                    role: "user",
                    content: `Analyze this feedback: "${text}"\n\nJSON structure: { "sentiment": "Positive|Neutral|Negative", "main_feedback": "summary", "action_needed": true|false }`
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const textResponse = chatCompletion.choices[0]?.message?.content || "";
        return JSON.parse(textResponse);
    } catch (error) {
        console.error("Feedback analysis failed:", error);
        return {
            sentiment: "Neutral",
            main_feedback: "Could not analyze feedback.",
            action_needed: false
        };
    }
};

const generateActivityDetails = async (data) => {
    const { location, coordinates, timeSlot, budget, preferences } = data;

    try {
        const prompt = `Generate detailed activity information for a specific location.

Location: ${location}
Time Slot: ${timeSlot}
Budget Level: ${budget} (1=Budget, 2=Moderate, 3=Luxury)
Preferences: ${preferences.join(', ') || 'General tourism'}

Provide a JSON response with the following structure:
{
    "title": "Activity name",
    "type": "Activity type (e.g., Sightseeing, Dining, Shopping, Experience)",
    "duration": "Estimated duration (e.g., 2h, 3h)",
    "cost": "Estimated cost with currency symbol (e.g., $25, $50)",
    "description": "Brief, engaging description of the activity (2-3 sentences)",
    "opening": "Opening time (e.g., 9:00 AM)",
    "closing": "Closing time (e.g., 6:00 PM)",
    "travelTime": "Estimated travel time from city center (e.g., 15 mins)",
    "bestTime": "Best time to visit (e.g., Early morning, Afternoon)",
    "crowdDensity": "Expected crowd level (e.g., Low, Moderate, High)",
    "warnings": "Any important warnings or tips",
    "culturalNotes": "Cultural etiquette or dress code if applicable"
}

Make the response realistic, specific to the location, and appropriate for the budget level.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable local travel guide who provides detailed, accurate information about tourist activities and attractions."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            temperature: 0.7
        });

        const textResponse = chatCompletion.choices[0]?.message?.content || "{}";
        const activityData = JSON.parse(textResponse);

        // Add coordinates if provided
        if (coordinates) {
            activityData.coords = coordinates;
        }

        // Add time slot
        activityData.time = timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1);

        return activityData;
    } catch (error) {
        console.error("Activity detail generation failed:", error);
        throw error;
    }
};

module.exports = { generateRealPlan, fetchWeather, analyzeFeedback, generateActivityDetails };
