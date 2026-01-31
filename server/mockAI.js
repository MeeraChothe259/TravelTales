const generateMockPlan = (data) => {
    const { destination, startDate, endDate, partners, mood, budget, preferences } = data;

    // Helper: Random Array Item
    const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const rndNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- ACTIVITY POOL BASED ON INTERESTS ---
    const activityPool = {
        'Foodie 🍜': [
            { title: 'Street Food Walk', type: 'Food', cost: '$15', duration: '2h', regret: 'High' },
            { title: 'Michelin Star Lunch', type: 'Food', cost: '$120', duration: '3h', regret: 'Medium' },
            { title: 'Local Market Tasting', type: 'Food', cost: '$0', duration: '1.5h', regret: 'High' },
            { title: 'Sunset Rooftop Drinks', type: 'Relax', cost: '$40', duration: '2h', regret: 'Low' }
        ],
        'History 🏛️': [
            { title: 'Ancient Temple Tour', type: 'History', cost: '$10', duration: '3h', regret: 'Extreme' },
            { title: 'National Museum Visit', type: 'History', cost: '$25', duration: '4h', regret: 'Medium' },
            { title: 'Old Town Heritage Walk', type: 'History', cost: '$0', duration: '2h', regret: 'High' },
            { title: 'Royal Palace Tour', type: 'History', cost: '$30', duration: '3h', regret: 'High' }
        ],
        'Nature 🌿': [
            { title: 'Sunrise Mountain Hike', type: 'Nature', cost: '$0', duration: '4h', regret: 'Extreme' },
            { title: 'Botanical Gardens', type: 'Relax', cost: '$15', duration: '2h', regret: 'Low' },
            { title: 'Waterfall Trek', type: 'Adventure', cost: 'Var', duration: '5h', regret: 'High' },
            { title: 'Scenic Lake Boat Ride', type: 'Relax', cost: '$20', duration: '1.5h', regret: 'Medium' }
        ],
        'Shopping 🛍️': [
            { title: 'Luxury Mall Hop', type: 'Shopping', cost: 'Free', duration: '3h', regret: 'Low' },
            { title: 'Local Artisan Bazaar', type: 'Shopping', cost: 'Free', duration: '2h', regret: 'Medium' },
            { title: 'Vintage District Walk', type: 'Shopping', cost: 'Free', duration: '2.5h', regret: 'Low' }
        ],
        'Adventure 🏔️': [
            { title: 'Zip-lining Adventure', type: 'Adventure', cost: '$80', duration: '3h', regret: 'High' },
            { title: 'White Water Rafting', type: 'Adventure', cost: '$60', duration: '4h', regret: 'Extreme' },
            { title: 'ATV Jungle Tour', type: 'Adventure', cost: '$100', duration: '2h', regret: 'Medium' }
        ],
        'Default': [
            { title: `Explore ${destination} City Center`, type: 'Explore', cost: 'Free', duration: '3h', regret: 'Medium' },
            { title: 'Famous Landmark Visit', type: 'Sightseeing', cost: '$20', duration: '2h', regret: 'High' },
            { title: 'Relax at City Park', type: 'Relax', cost: 'Free', duration: '1h', regret: 'Low' }
        ]
    };

    // Helper: Get relevant activity or fallback
    const getActivity = (timeSlot) => {
        // 50% chance to pick from user preferences, 50% random/default
        // If no prefs, use default
        let pool = activityPool['Default'];
        if (preferences.length > 0 && Math.random() > 0.3) {
            const pickedPref = rnd(preferences);
            if (activityPool[pickedPref]) pool = activityPool[pickedPref];
        } else if (mood === 'adventure' && Math.random() > 0.5) {
            pool = activityPool['Adventure 🏔️'];
        }

        const act = rnd(pool);

        return {
            title: act.title,
            type: act.type,
            time: timeSlot,
            duration: act.duration,
            travelTime: `${rndNum(10, 45)} mins`,
            cost: act.cost,
            hours: '09:00 AM - 06:00 PM',
            safeToSkip: act.regret === 'Low',
            regretProb: act.regret === 'Extreme' ? '95%' : act.regret === 'High' ? '80%' : act.regret === 'Medium' ? '40%' : '10%'
        };
    };

    // --- GENERATE DAYS ---
    const days = [];
    for (let i = 1; i <= 3; i++) {
        days.push({
            day: i,
            date: new Date(new Date(startDate).getTime() + (i - 1) * 86400000).toDateString(),
            weather: rnd(['Sunny ☀️', 'Clear 🌤️', 'Breezy 🍃']),
            morning: getActivity('Morning'),
            afternoon: getActivity('Afternoon'),
            evening: getActivity('Evening')
        });
    }

    // --- BUDGET CALC ---
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
        destination,
        dates: `${startDate} to ${endDate}`,
        travelers: partners,
        vibe: mood,
        budgetSummary: {
            total: dailyCost * 3 * (partners === 'Solo' ? 1 : 2),
            perPerson: dailyCost * 3,
            level: budgetLevel,
        },
        itinerary: days,
        highlights: allHighlights,
        localIntelligence
    };
};

module.exports = { generateMockPlan };
