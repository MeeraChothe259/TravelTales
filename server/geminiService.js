const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require("dotenv").config();
const { fetchDestinationImage } = require('./imageService');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        tools: [{ googleSearchRetrieval: {} }]
    });

    const prompt = `
        Generate a highly detailed travel itinerary for ${destination} from ${startDate} to ${endDate}.
        Travelers: ${travelerCount} (${partners}). Vibe: ${mood}. Budget: ${budget} (1=Low, 2=Medium, 3=Premium).
        Interests: ${preferences.join(", ")}.
        Language: ${language}.

        Response must be a valid JSON object matching this EXACT structure:
        {
          "tripName": "A catchy name for the trip",
          "destination": "${destination}",
          "destinationCoords": { "lat": number, "lng": number },
          "dates": "${startDate} to ${endDate}",
          "travelers": "${partners}",
          "vibe": "${mood}",
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
               "wakeup": { "title": "Morning Routine", "type": "Personal", "time": "7:00 AM - 8:00 AM", "duration": "1h", "cost": "Free", "description": "string" },
               "breakfast": { "title": "string", "type": "Meal", "time": "8:00 AM - 9:30 AM", "duration": "string", "cost": "string", "description": "string", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" } },
               "morning": { 
                  "title": "string", "type": "string", "time": "10:00 AM - 1:00 PM", "duration": "string", "travelTime": "string", 
                  "cost": "string with currency symbol", "opening": "string", "closing": "string", "holidays": "string", 
                  "warnings": "string", "safeToSkip": boolean, "regretProb": "percentage", "crowdDensity": "percentage", "bestTime": "string",
                  "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" },
                  "coords": { "lat": number, "lng": number } 
               },
               "lunch": { "title": "string", "type": "Meal", "time": "1:00 PM - 2:30 PM", "duration": "string", "cost": "string", "description": "string", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" } },
               "afternoon": { "title": "string", "type": "string", "time": "3:00 PM - 6:00 PM", "duration": "string", "cost": "string", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" }, "coords": { "lat": number, "lng": number } },
               "evening": { "title": "string", "type": "string", "time": "6:30 PM - 8:00 PM", "duration": "string", "cost": "string", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" }, "coords": { "lat": number, "lng": number } },
               "dinner": { "title": "string", "type": "Meal", "time": "8:30 PM - 10:30 PM", "duration": "string", "cost": "string", "description": "string", "crowdDensity": "percentage", "bestTime": "string", "smartAlternatives": { "skipped": "string", "late": "string", "overspent": "string" } }
            }
          ],
          "highlights": ["string"],
          "liveContext": {
             "news": [{"title": "string", "source": "string", "relevance": "string"}],
             "events": [{"name": "string", "date": "string", "description": "string"}],
             "safetyAlert": "Current safety level or specific alert"
          },
          "localIntelligence": {
             "food": { "specialties": ["string"], "restaurants": [{ "name": "string", "type": "string", "price": "e.g. $", "tags": ["string"], "coords": { "lat": number, "lng": number } }] },
             "transport": { "routes": ["string"], "passes": ["string"], "contacts": [{"type": "string", "name": "string", "contact": "string"}], "hubs": [{"name": "string", "coords": { "lat": number, "lng": number }}] },
             "rental": { "contacts": [{"type": "string", "name": "string", "contact": "string"}], "options": ["string"] },
             "guides": [{"name": "string", "languages": ["string"], "rating": number, "specialty": "string"}]
          },
          "hotelSuggestions": [
             {
                "name": "string",
                "description": "string",
                "pricePerNight": number,
                "rating": number,
                "amenities": ["string"],
                "roomTypes": ["string"],
                "location": "string",
                "coords": { "lat": number, "lng": number },
                "imageUrl": "string placeholder or keyword for search",
                "phone": "string",
                "address": "string"
             }
          ],
          "hiddenGems": [
             {
                "title": "string",
                "description": "string",
                "whyUnderrated": "string",
                "coords": { "lat": number, "lng": number },
                "imageUrl": "string"
             }
          ],
          "vlogs": [
             {
                "title": "string (Real vlog title)",
                "youtuber": "string (Real creator name)",
                "url": "https://www.youtube.com/watch?v=VIDEO_ID",
                "thumbnail": "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg"
             }
          ]
        }


        IMPORTANT: 
        - For vlogs, USE THE SEARCH TOOL to find high-quality, popular, and REAL YouTube videos specifically about the destination. Use well-known creators like Lost LeBlanc, Kara and Nate, or Mark Wiens. Do not generate fake URLs.
        - For hiddenGems, USE THE SEARCH TOOL to find 3-5 REAL, underrated, and authentic hidden gems in ${destination}. These should be spots not typically found in top 10 tourist lists.
        - For smartAlternatives, provide SPECIFIC, CREATIVE, and ACTIONABLE suggestions:
        - "late": Suggest rescheduling with exact times, transportation tips, and time-saving hacks
        - "skipped": Recommend nearby alternatives with descriptions, distances, and why locals love them
        - "overspent": Provide budget-friendly swaps with cost comparisons and authentic local experiences
        
        Examples:
        - late: "Start with breakfast at Café Luna (5 min walk), then taxi to the museum by 11 AM. Skip the gift shop to save 20 mins!"
        - skipped: "Visit the artisan market 10 mins away - live music, street food, handmade crafts. Locals' favorite spot!"
        - overspent: "Join the free walking tour (tips-based, every 2 hours). Pack a picnic from the market - save $30 and eat like a local!"

        Be realistic with costs. Use local currency converted to USD for budgetSummary. 
        Ensure all text is in the requested language (${language}).
        Return ONLY the JSON object. No markdown, no preamble.
    `;

    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            throw new Error("Missing Gemini API Key");
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean markdown if AI includes it
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const plan = JSON.parse(text);

        // Enhance with real weather and images
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
                    imageUrl: "https://images.unsplash.com/photo-1558239325-466986503c1b?auto=format&fit=crop&w=800&q=80"
                },
                {
                    title: "Local Artisanal Alley",
                    description: "A vibrant but narrow street filled with craftsmen, vintage record stores, and the best local coffee.",
                    whyUnderrated: "Too small for tour buses, this street preserves the authentic vibe of the neighborhood.",
                    coords: plan.destinationCoords || { lat: 0, lng: 0 },
                    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80"
                }
            ];
        }

        return plan;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

module.exports = { generateRealPlan };
