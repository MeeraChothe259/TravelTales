const generateMockPlan = (data) => {
    const { destination, startDate, endDate, partners, mood, budget, preferences, safety } = data;

    if (!destination) {
        throw new Error("Destination is required");
    }
    const dest = destination.toLowerCase().trim();

    // Helper: Random Array Item
    const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const rndNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- GLOBAL ACTIVITY POOL (FALLBACK) ---
    const fallbackPool = {
        'Morning 🌅': [
            { title: 'Local Market Exploration', cost: 'Free', duration: '2h', opening: '08:00 AM', closing: '02:00 PM', holidays: 'None', warnings: 'Great for fresh produce and local vibes.' },
            { title: 'Sunrise Lookout Hike', cost: 'Free', duration: '3h', opening: 'Dawn', closing: 'Dusk', holidays: 'None', warnings: 'Bring water and wear steady shoes.' },
            { title: 'Traditional Breakfast Spot', cost: '$12', duration: '1h', opening: '07:00 AM', closing: '11:00 AM', holidays: 'None', warnings: 'Popular with locals; might have a short wait.' }
        ],
        'Afternoon ☀️': [
            { title: 'Central Park / Public Square', cost: 'Free', duration: '2.5h', opening: '24/7', closing: 'N/A', holidays: 'None', warnings: 'Good place for people watching.' },
            { title: 'Regional Art Gallery', cost: '$15', duration: '3h', opening: '10:00 AM', closing: '06:00 PM', holidays: 'Mondays', warnings: 'No flash photography allowed.' },
            { title: 'Hidden Alleyway Cafe', cost: '$10', duration: '1.5h', opening: '11:00 AM', closing: '08:00 PM', holidays: 'None', warnings: 'Cash only in most small spots.' }
        ],
        'Evening 🌙': [
            { title: 'Riverside Sunset Walk', cost: 'Free', duration: '1h', opening: 'N/A', closing: 'N/A', holidays: 'None', warnings: 'Arrive 20 mins early for the best glow.' },
            { title: 'Cozy Neighborhood Bistro', cost: '$35', duration: '2h', opening: '06:00 PM', closing: '11:00 PM', holidays: 'None', warnings: 'Reservations recommended for weekends.' },
            { title: 'Local Live Music Bar', cost: '$15', duration: '3h', opening: '08:00 PM', closing: '02:00 AM', holidays: 'None', warnings: 'Might get loud; great atmosphere.' }
        ]
    };

    // --- REALISTIC LOCATION POOLS ---
    const locationPools = {
        'london': {
            'Morning 🌅': [
                { title: 'Tower of London Tour', cost: '£30', duration: '3h', opening: '09:00 AM', closing: '04:30 PM', holidays: 'Mondays (early)', warnings: 'Last entry is 3:30 PM.' },
                { title: 'Sky Garden Views', cost: 'Free', duration: '1h', opening: '10:00 AM', closing: '06:00 PM', holidays: 'None', warnings: 'Must book free tickets 3 weeks ahead!' }
            ],
            'Afternoon ☀️': [
                { title: 'Westminster Abbey', cost: '£31', duration: '2h', opening: '09:30 AM', closing: '03:30 PM', holidays: 'Sundays', warnings: 'Modest dress code (cover shoulders).' },
                { title: 'Afternoon Tea Bus Tour', cost: '£49', duration: '1.5h', opening: 'Runs hourly', closing: 'N/A', holidays: 'None', warnings: 'Book in advance; great city views.' }
            ],
            'Evening 🌙': [
                { title: 'The View from The Shard', cost: '£32', duration: '1.5h', opening: '10:00 AM', closing: '10:00 PM', holidays: 'None', warnings: 'Sunset slots sell out fast.' },
                { title: 'West End Musical Show', cost: '£28+', duration: '2.5h', opening: '07:30 PM', closing: '10:00 PM', holidays: 'None', warnings: 'Check for matinee shows on weekends.' }
            ]
        },
        'bali': {
            'Morning 🌅': [
                { title: 'Mount Batur Sunrise Hike', cost: 'IDR 400k', duration: '5h', opening: '02:00 AM', closing: 'N/A', holidays: 'Nyepi Day', warnings: 'Flashlight and warm jacket required.' },
                { title: 'Tegalalang Rice Terraces', cost: '$5', duration: '2h', opening: '08:00 AM', closing: '06:00 PM', holidays: 'None', warnings: 'Prepare for many stairs and jungle heat.' }
            ],
            'Afternoon ☀️': [
                { title: 'Sacred Monkey Forest', cost: '$6', duration: '2h', opening: '09:00 AM', closing: '05:00 PM', holidays: 'None', warnings: 'Do not bring food or loose items near monkeys.' },
                { title: 'Uluwatu Temple Visit', cost: '$3', duration: '1.5h', opening: '07:00 AM', closing: '07:00 PM', holidays: 'None', warnings: 'Breathtaking cliffside views.' }
            ],
            'Evening 🌙': [
                { title: 'Kecak Fire Dance Show', cost: '$10', duration: '1h', opening: '06:00 PM', closing: '07:00 PM', holidays: 'None', warnings: 'Shows are timed with the sunset.' },
                { title: 'Seafood Dinner in Jimbaran', cost: '$30', duration: '2h', opening: '05:00 PM', closing: '11:00 PM', holidays: 'None', warnings: 'Dine right on the sand by the ocean.' }
            ]
        },
        'dubai': {
            'Morning 🌅': [
                { title: 'At The Top - Burj Khalifa', cost: 'AED 159', duration: '2h', opening: '08:00 AM', closing: '12:00 AM', holidays: 'None', warnings: 'Sunrise slots at 5 AM available.' },
                { title: 'Old Dubai Abra Ride', cost: 'AED 2', duration: '1h', opening: '05:00 AM', closing: '12:00 AM', holidays: 'None', warnings: 'Traditional wooden boat across the creek.' }
            ],
            'Afternoon ☀️': [
                { title: 'The Dubai Mall & Aquarium', cost: 'Free/AED 169', duration: '4h', opening: '10:00 AM', closing: '11:00 PM', holidays: 'None', warnings: 'Wear walking shoes; largest mall globally.' },
                { title: 'Ski Dubai Snow Classic', cost: '$73', duration: '3h', opening: '10:00 AM', closing: '11:00 PM', holidays: 'None', warnings: 'Winter gear provided in the desert!' }
            ],
            'Evening 🌙': [
                { title: 'Dubai Fountain Show', cost: 'Free', duration: '1h', opening: '06:00 PM', closing: '11:00 PM', holidays: 'None', warnings: 'Shows run every 30 minutes.' },
                { title: 'Dhow Cruise Dinner', cost: 'AED 250', duration: '2h', opening: '08:00 PM', closing: '10:00 PM', holidays: 'None', warnings: 'Stunning skyline views from the water.' }
            ]
        },
        'rome': {
            'Morning 🌅': [
                { title: 'Colosseum & Roman Forum', cost: '€18', duration: '3h', opening: '08:30 AM', closing: '07:00 PM', holidays: 'None', warnings: 'Book weeks in advance for skip-the-line.' },
                { title: 'Vatican Museums', cost: '€17', duration: '4h', opening: '09:00 AM', closing: '06:00 PM', holidays: 'Sundays', warnings: 'Includes Sistine Chapel; strict dress code.' }
            ],
            'Afternoon ☀️': [
                { title: 'Pantheon & Trevi Fountain', cost: 'Free', duration: '2h', opening: '09:00 AM', closing: '07:00 PM', holidays: 'None', warnings: 'Toss a coin into the Trevi for good luck!' },
                { title: 'Villa Borghese Gardens', cost: 'Free', duration: '2h', opening: 'Dawn', closing: 'Dusk', holidays: 'None', warnings: 'Rent a rowboat on the artificial lake.' }
            ],
            'Evening 🌙': [
                { title: 'Dinner in Trastevere', cost: '€40', duration: '2.5h', opening: '07:30 PM', closing: '11:30 PM', holidays: 'None', warnings: 'Most authentic Roman food scene.' },
                { title: 'Castel Sant’Angelo At Night', cost: '€12', duration: '2h', opening: '09:00 AM', closing: '12:00 AM', holidays: 'Mondays', warnings: 'Spectacular views of St. Peter’s Basilica.' }
            ]
        },
        'paris': {
            'Morning 🌅': [
                { title: 'Eiffel Tower Summit', cost: '€28', duration: '2h', opening: '09:30 AM', closing: '11:45 PM', holidays: 'None', warnings: 'Avoid illegal street vendors at the base.' },
                { title: 'Louvre Museum Highlights', cost: '€22', duration: '3h', opening: '09:00 AM', closing: '06:00 PM', holidays: 'Tuesdays', warnings: 'Entry via Pyramid is busiest; try Carrousel entrance.' }
            ],
            'Afternoon ☀️': [
                { title: 'Sacré-Cœur & Montmartre', cost: 'Free', duration: '2.5h', opening: '06:00 AM', closing: '10:30 PM', holidays: 'None', warnings: 'Steep hill; beware of "bracelet sellers".' },
                { title: 'Seine River Cruise', cost: '€16', duration: '1h', opening: '10:00 AM', closing: '10:30 PM', holidays: 'None', warnings: 'Best views during the "Blue Hour" before dusk.' }
            ],
            'Evening 🌙': [
                { title: 'Moulin Rouge Cabaret', cost: '€120', duration: '2.5h', opening: '09:00 PM', closing: '11:30 PM', holidays: 'None', warnings: 'Formal attire recommended; book months out.' }
            ]
        },
        'tokyo': {
            'Morning 🌅': [
                { title: 'Tsukiji Fish Market', cost: 'Free/Food', duration: '2h', opening: '05:00 AM', closing: '02:00 PM', holidays: 'Sundays', warnings: 'Wear closed-toe shoes; inner market is early only.' }
            ],
            'Afternoon ☀️': [
                { title: 'Shibuya Crossing & Hachiko', cost: 'Free', duration: '1h', opening: 'Always Open', closing: 'N/A', holidays: 'None', warnings: 'Great views from the Starbucks upstairs.' }
            ],
            'Evening 🌙': [
                { title: 'Shinjuku Golden Gai Drinks', cost: 'Var', duration: '3h', opening: '07:00 PM', closing: '04:00 AM', holidays: 'None', warnings: 'Tiny bars; many have cover charges.' }
            ]
        }
    };

    // Helper: Build a day's slot
    const getSlot = (location, slotName) => {
        let pool = fallbackPool[slotName];

        // Match specific location data if available
        if (locationPools[dest] && locationPools[dest][slotName]) {
            pool = [...pool, ...locationPools[dest][slotName]];
        }

        const act = rnd(pool);
        const regretLevels = ['Low', 'Medium', 'High', 'Extreme'];
        const pickedRegret = rnd(regretLevels);

        return {
            title: act.title,
            type: act.type || 'Experience',
            time: slotName.split(' ')[0], // Morning, Afternoon, etc.
            duration: act.duration,
            travelTime: `${rndNum(10, 45)} mins`,
            cost: act.cost,
            opening: act.opening,
            closing: act.closing,
            holidays: act.holidays,
            warnings: act.warnings,
            safeToSkip: pickedRegret === 'Low',
            regretProb: pickedRegret === 'Extreme' ? '95%' : pickedRegret === 'High' ? '85%' : pickedRegret === 'Medium' ? '45%' : '10%'
        };
    };

    // --- CALCULATE DURATION ---
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // --- GENERATE DAYS ---
    const days = [];
    for (let i = 1; i <= numDays; i++) {
        days.push({
            day: i,
            date: new Date(start.getTime() + (i - 1) * 86400000).toDateString(),
            weather: rnd(['Sunny ☀️', 'Clear 🌤️', 'Breezy 🍃', 'Partly Cloudy ⛅']),
            morning: getSlot(dest, 'Morning 🌅'),
            afternoon: getSlot(dest, 'Afternoon ☀️'),
            evening: getSlot(dest, 'Evening 🌙')
        });
    }

    const budgetLevel = budget === 1 ? 'Budget' : budget === 2 ? 'Moderate' : 'Luxury';
    const dailyCost = budget === 1 ? 80 : budget === 2 ? 180 : 450;

    // Combine preferences and safety for highlights
    let allHighlights = preferences.length > 0 ? [...preferences] : ['Culture', 'Food', 'Scenery'];
    if (data.safety && data.safety.length > 0) {
        allHighlights = [...allHighlights, ...data.safety];
    }


    // --- LOCAL INTELLIGENCE ---
    const localIntelligence = {
        food: {
            specialties: ['Local Ramen', 'Street Sushi', 'Matcha Sweets', 'Yakiniku BBQ'],
            restaurants: [
                { name: 'Ichiraku Ramen', type: 'Local Favorite', price: '$', tags: ['Comfort Food', 'Fast'] },
                { name: 'Sakura Garden', type: 'Fine Dining', price: '$$$', tags: ['Vegetarian Friendly', 'View'] },
                { name: 'Ocean Blue', type: 'Seafood', price: '$$', tags: ['Fresh Catch', 'Outdoor'] }
            ]
        },
        transport: {
            routes: ['City Loop Bus (Line 5)', 'Metro Green Line', 'River Ferry'],
            passes: ['Day Pass ($8)', '3-Day Tourist Card ($20)'],
            contacts: [
                { type: 'Taxi', name: 'City Cab', contact: '+1 234 567 890' },
                { type: 'Rental', name: 'Bike & Go', contact: 'App Download' }
            ]
        },
        guides: [
            { name: 'Kenji Sato', languages: ['English', 'Japanese'], rating: 4.9, specialty: 'History & Culture' },
            { name: 'Sarah Lee', languages: ['English', 'Korean'], rating: 4.8, specialty: 'Food Tours' }
        ]
    };

    return {
        tripName: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Trip to ${destination}`,
        destination,
        dates: `${startDate} to ${endDate}`,
        travelers: partners,
        vibe: mood,
        budgetSummary: {
            total: dailyCost * numDays * (partners === 'Solo' ? 1 : 2),
            perPerson: dailyCost * numDays,
            level: budgetLevel,
            currency: 'USD'
        },
        itinerary: days,
        highlights: allHighlights,
        localIntelligence
    };
};

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    systemInstruction: "You are TravelTales AI. Provide extremely short, specific, and straight-forward answers. NO fluff, NO enthusiasm. Just give the direct facts asked for. If the user makes a typo like 'Parys', understand it as Paris but keep the answer brief. Your goal is maximum efficiency."
});

const handleChatResponse = async (message) => {
    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        if (error.message.includes("429")) {
            console.warn("Gemini Rate Limit Hit. Falling back to mock.");
            return "I'm a bit overwhelmed with travel requests right now! Please wait a few seconds and ask me again. In the meantime, I can still help with basics!";
        }
        console.error("Gemini Error:", error.message);

        // Fallback Mock Logic
        const msg = message.toLowerCase().trim();
        const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const travelKnowledge = {
            greetings: ["Hello! I'm your TravelTales assistant. How can I help you explore today?", "Hi there!", "Greeting! I'm ready to help you plan."],
            fallback: ["I'm having a little trouble connecting to my global brain right now, but I can still help you with basics! What's on your mind?", "My AI signals are a bit weak, but I'm here for your travel needs."]
        };

        if (msg.includes("hello") || msg.includes("hi")) return rnd(travelKnowledge.greetings);
        return rnd(travelKnowledge.fallback);
    }
};

module.exports = { generateMockPlan, handleChatResponse };
