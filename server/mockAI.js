const generateMockPlan = (data) => {
    const {
        destination,
        startDate,
        endDate,
        partners = 'Solo',
        mood = 'relaxed',
        budget = 2,
        preferences = [],
        safety = [],
        language = 'en'
    } = data;

    if (!destination) {
        throw new Error("Destination is required");
    }
    const dest = destination.toLowerCase().trim();

    // Helper: Random Array Item
    const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const rndNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- SIMPLE BACKEND TRANSLATIONS ---
    const backendDict = {
        en: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', tripTo: 'Trip to', budget: 'Budget', moderate: 'Moderate', luxury: 'Luxury' },
        es: { morning: 'Mañana', afternoon: 'Tarde', evening: 'Noche', tripTo: 'Viaje a', budget: 'Económico', moderate: 'Moderado', luxury: 'Lujo' },
        fr: { morning: 'Matin', afternoon: 'Après-midi', evening: 'Soirée', tripTo: 'Voyage à', budget: 'Petit budget', moderate: 'Modéré', luxury: 'Luxe' },
        zh: { morning: '早晨', afternoon: '下午', evening: '晚上', tripTo: '去', budget: '经济型', moderate: '中等', luxury: '豪华' },
        ar: { morning: 'صباحاً', afternoon: 'بعد الظهر', evening: 'مساءً', tripTo: 'رحلة إلى', budget: 'اقتصادي', moderate: 'متوسط', luxury: 'فاخر' },
        hi: { morning: 'सुबह', afternoon: 'दोपहर', evening: 'शाम', tripTo: 'की यात्रा', budget: 'बजट', moderate: 'मध्यम', luxury: 'लक्जरी' },
        de: { morning: 'Morgen', afternoon: 'Nachmittag', evening: 'Abend', tripTo: 'Reise nach', budget: 'Günstig', moderate: 'Mittel', luxury: 'Luxus' },
        pt: { morning: 'Manhã', afternoon: 'Tarde', evening: 'Noite', tripTo: 'Viagem para', budget: 'Económico', moderate: 'Moderado', luxury: 'Luxo' },
        ja: { morning: '朝', afternoon: '昼', evening: '夜', tripTo: 'への旅行', budget: '格安', moderate: '標準', luxury: '豪華' },
        ru: { morning: 'Утро', afternoon: 'День', evening: 'Вечер', tripTo: 'Поездка в', budget: 'Бюджетный', moderate: 'Умеренный', luxury: 'Люкс' }
    };

    const dict = backendDict[language] || backendDict['en'];

    // --- GLOBAL ACTIVITY POOL (FALLBACK) ---
    const fallbackPool = {
        'Morning': [
            { title: language === 'en' ? 'Local Market Exploration' : 'Exploration du marché local', cost: 'Free', duration: '2h', opening: '08:00 AM', closing: '02:00 PM', holidays: 'None', warnings: 'Great for fresh produce.' },
            { title: 'Sunrise Lookout Hike', cost: 'Free', duration: '3h', opening: 'Dawn', closing: 'Dusk', holidays: 'None', warnings: 'Bring water.' },
            { title: 'Traditional Breakfast Spot', cost: '$12', duration: '1h', opening: '07:00 AM', closing: '11:00 AM', holidays: 'None', warnings: 'Popular with locals.' }
        ],
        'Afternoon': [
            { title: 'Central Park / Public Square', cost: 'Free', duration: '2.5h', opening: '24/7', closing: 'N/A', holidays: 'None' },
            { title: 'Regional Art Gallery', cost: '$15', duration: '3h', opening: '10:00 AM', closing: '06:00 PM', holidays: 'Mondays' },
            { title: 'Hidden Alleyway Cafe', cost: '$10', duration: '1.5h', opening: '11:00 AM', closing: '08:00 PM', holidays: 'None' }
        ],
        'Evening': [
            { title: 'Riverside Sunset Walk', cost: 'Free', duration: '1h', opening: 'N/A', closing: 'N/A', holidays: 'None' },
            { title: 'Cozy Neighborhood Bistro', cost: '$35', duration: '2h', opening: '06:00 PM', closing: '11:00 PM', holidays: 'None' },
            { title: 'Local Live Music Bar', cost: '$15', duration: '3h', opening: '08:00 PM', closing: '02:00 AM', holidays: 'None' }
        ]
    };

    // Note: In a real app, these would be fetched from a database or AI in the target language.
    // For this mock, we'll keep the titles mostly English but localize structure.

    // --- REALISTIC LOCATION POOLS ---
    const locationPools = {
        'london': {
            'Morning': [{ title: 'Tower of London Tour', cost: '£30', duration: '3h', opening: '09:00 AM', closing: '04:30 PM' }],
            'Afternoon': [{ title: 'Westminster Abbey', cost: '£31', duration: '2h', opening: '09:30 AM', closing: '03:30 PM' }],
            'Evening': [{ title: 'The View from The Shard', cost: '£32', duration: '1.5h', opening: '10:00 AM', closing: '10:00 PM' }]
        },
        'bali': {
            'Morning': [{ title: 'Mount Batur Sunrise Hike', cost: '$30', duration: '5h' }],
            'Afternoon': [{ title: 'Sacred Monkey Forest', cost: '$6', duration: '2h' }],
            'Evening': [{ title: 'Seafood Dinner in Jimbaran', cost: '$30', duration: '2h' }]
        }
    };

    // Helper: Build a day's slot
    const getSlot = (location, slotName) => {
        let pool = fallbackPool[slotName];

        if (locationPools[dest] && locationPools[dest][slotName]) {
            pool = [...pool, ...locationPools[dest][slotName]];
        }

        const act = rnd(pool);
        const regretLevels = ['Low', 'Medium', 'High', 'Extreme'];
        const pickedRegret = rnd(regretLevels);

        return {
            title: act.title,
            type: act.type || 'Experience',
            time: dict[slotName.toLowerCase()],
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

    // Parse cost string to number
    const parseCost = (costStr) => {
        if (!costStr || costStr.toLowerCase() === 'free') return 0;
        const match = costStr.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    // --- CALCULATE DURATION ---
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // --- GENERATE DAYS ---
    const days = [];
    let totalActivityCost = 0;
    const dayWiseActivityCosts = [];

    for (let i = 1; i <= numDays; i++) {
        const morning = getSlot(dest, 'Morning');
        const afternoon = getSlot(dest, 'Afternoon');
        const evening = getSlot(dest, 'Evening');

        const dayCost = parseCost(morning.cost) + parseCost(afternoon.cost) + parseCost(evening.cost);
        totalActivityCost += dayCost;
        dayWiseActivityCosts.push(dayCost);

        days.push({
            day: i,
            date: new Date(start.getTime() + (i - 1) * 86400000).toDateString(),
            weather: rnd(['Sunny ☀️', 'Clear 🌤️', 'Breezy 🍃', 'Partly Cloudy ⛅']),
            morning,
            afternoon,
            evening
        });
    }

    const budgetLevel = budget === 1 ? dict.budget : budget === 2 ? dict.moderate : dict.luxury;
    const targetDailyBudget = budget === 1 ? 80 : budget === 2 ? 180 : 450;
    const dailyExpensesBase = targetDailyBudget * 0.6;

    const numTravelers = data.travelerCount || (partners === 'Solo' ? 1 : partners === 'Couple' ? 2 : partners === 'Friends' ? 3 : 4);
    const totalTripCost = (totalActivityCost + (dailyExpensesBase * numDays)) * numTravelers;

    const budgetDetails = {
        totalEstimated: totalTripCost,
        targetDaily: targetDailyBudget,
        currency: 'USD',
        level: budgetLevel,
        travelers: numTravelers,
        partnerSplit: Math.round(totalTripCost / numTravelers),
        dayWise: days.map((d, i) => ({
            day: d.day,
            activities: dayWiseActivityCosts[i],
            overhead: dailyExpensesBase,
            total: (dayWiseActivityCosts[i] + dailyExpensesBase) * numTravelers,
            target: targetDailyBudget * numTravelers,
            overspendPercent: ((dayWiseActivityCosts[i] + dailyExpensesBase) * numTravelers) > (targetDailyBudget * numTravelers) ? 15 : 0
        }))
    };

    const localIntelligence = {
        food: {
            specialties: language === 'ja' ? ['ラーメン', '寿司', '抹茶', '焼肉'] : ['Local Ramen', 'Street Sushi', 'Matcha Sweets', 'Yakiniku BBQ'],
            restaurants: [
                { name: 'Ichiraku Ramen', type: 'Local Favorite', price: '$', tags: ['Comfort Food', 'Fast'] },
                { name: 'Sakura Garden', type: 'Fine Dining', price: '$$$', tags: ['Vegetarian Friendly', 'View'] }
            ]
        },
        transport: {
            routes: ['City Loop Bus (Line 5)', 'Metro Green Line'],
            passes: ['Day Pass ($8)', '3-Day Tourist Card ($20)'],
            contacts: [{ type: 'Taxi', name: 'City Cab', contact: '+1 234 567 890' }]
        },
        guides: [
            { name: 'Kenji Sato', languages: ['English', 'Japanese'], rating: 4.9, specialty: 'History & Culture' }
        ]
    };

    let tripName = `${mood.charAt(0).toUpperCase() + mood.slice(1)} ${dict.tripTo} ${destination}`;
    if (language === 'zh') tripName = `${dict.tripTo}${destination}的${mood}之旅`;
    if (language === 'ja') tripName = `${destination}${dict.tripTo}（${mood}）`;

    return {
        tripName,
        destination,
        dates: `${startDate} to ${endDate}`,
        travelers: partners,
        vibe: mood,
        budgetSummary: {
            total: totalTripCost,
            perPerson: Math.round(totalTripCost / numTravelers),
            level: budgetLevel,
            currency: 'USD'
        },
        budgetDetails,
        itinerary: days,
        highlights: preferences.length > 0 ? [...preferences] : ['Culture', 'Food', 'Scenery'],
        localIntelligence
    };
};

module.exports = { generateMockPlan };
