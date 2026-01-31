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

        const densities = ['15%', '30%', '45%', '60%', '75%', '90%'];
        const bestTimes = ['7:00 AM', '10:30 AM', '2:00 PM', '5:30 PM', '8:00 PM'];

        const lateAlternatives = [
            `Start with a quick breakfast at a nearby café, then head straight to ${act.title} by ${slotName === 'Morning' ? '11:30 AM' : '3:00 PM'}. Skip the gift shop to save time!`,
            `Combine this with your ${slotName === 'Morning' ? 'afternoon' : 'evening'} activity. Take a taxi instead of public transport to make up lost time.`,
            `Reschedule to tomorrow morning and use today to explore the neighborhood on foot - you'll discover hidden gems!`,
            `Turn it into a sunset visit instead! The ${slotName === 'Morning' ? 'evening' : 'late night'} crowds are smaller and the lighting is magical for photos.`
        ];

        const skippedAlternatives = [
            `Visit the local artisan market just 10 minutes away - authentic crafts, live music, and street food. Open until 8 PM!`,
            `Head to the riverside promenade for a scenic walk. Locals love it, and there's a famous ice cream vendor at the north end.`,
            `Check out the neighborhood's historic library - free entry, stunning architecture, and a rooftop café with panoramic views.`,
            `Explore the botanical gardens nearby. Peaceful, Instagram-worthy, and you might catch a free guided tour at 4 PM.`,
            `Try the underground food hall - 20+ vendors, live cooking demos, and it's where locals actually eat. Much better than tourist traps!`
        ];

        const overspentAlternatives = [
            `Switch to a free walking tour of the old quarter - tips-based, and guides are incredibly knowledgeable. Starts every 2 hours.`,
            `Pack a picnic from the local grocery store and enjoy it at the central park. Save $30+ and it's more authentic!`,
            `Visit the free museum district instead - world-class exhibits, no entry fee on weekdays. Grab street food nearby for $5.`,
            `Take the scenic route on foot instead of a taxi. You'll save money AND discover amazing street art and local cafés.`,
            `Join a community cooking class ($15 vs $50 restaurant) - learn local recipes, eat what you make, and take home new skills!`
        ];

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
            regretProb: pickedRegret === 'Extreme' ? '95%' : pickedRegret === 'High' ? '85%' : pickedRegret === 'Medium' ? '45%' : '10%',
            crowdDensity: rnd(densities),
            bestTime: rnd(bestTimes),
            smartAlternatives: {
                late: rnd(lateAlternatives),
                skipped: rnd(skippedAlternatives),
                overspent: rnd(overspentAlternatives)
            }
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


    // --- GENERATE DAYS WITH FULL SCHEDULE ---
    const days = [];
    let totalActivityCost = 0;
    const dayWiseActivityCosts = [];

    // Meal options based on budget
    const breakfastOptions = {
        1: [
            { title: 'Local Café Breakfast', cost: '$8', duration: '45 mins', type: 'Meal', description: 'Fresh pastries and coffee at a neighborhood café' },
            { title: 'Street Food Breakfast', cost: '$5', duration: '30 mins', type: 'Meal', description: 'Authentic local breakfast from street vendors' },
            { title: 'Hotel Breakfast Buffet', cost: '$12', duration: '1h', type: 'Meal', description: 'Continental breakfast at your hotel' }
        ],
        2: [
            { title: 'Brunch at Trendy Bistro', cost: '$25', duration: '1.5h', type: 'Meal', description: 'Instagram-worthy brunch with local specialties' },
            { title: 'Rooftop Breakfast', cost: '$22', duration: '1h', type: 'Meal', description: 'Breakfast with panoramic city views' },
            { title: 'Farm-to-Table Morning', cost: '$28', duration: '1.5h', type: 'Meal', description: 'Organic breakfast with fresh local ingredients' }
        ],
        3: [
            { title: 'Luxury Hotel Breakfast', cost: '$45', duration: '2h', type: 'Meal', description: 'Five-star breakfast experience with champagne' },
            { title: 'Celebrity Chef Brunch', cost: '$65', duration: '2h', type: 'Meal', description: 'Exclusive brunch by renowned local chef' },
            { title: 'Private Terrace Breakfast', cost: '$55', duration: '1.5h', type: 'Meal', description: 'Personalized breakfast service on private terrace' }
        ]
    };

    const lunchOptions = {
        1: [
            { title: 'Local Food Market', cost: '$10', duration: '1h', type: 'Meal', description: 'Fresh, authentic lunch from market stalls' },
            { title: 'Quick Bite Café', cost: '$12', duration: '45 mins', type: 'Meal', description: 'Fast casual lunch near attractions' },
            { title: 'Picnic in the Park', cost: '$8', duration: '1h', type: 'Meal', description: 'Grab groceries and enjoy outdoor lunch' }
        ],
        2: [
            { title: 'Riverside Restaurant', cost: '$35', duration: '1.5h', type: 'Meal', description: 'Scenic lunch with local cuisine' },
            { title: 'Hidden Gem Bistro', cost: '$30', duration: '1.5h', type: 'Meal', description: 'Local favorite spot off the tourist path' },
            { title: 'Artisan Pizza & Wine', cost: '$32', duration: '1.5h', type: 'Meal', description: 'Wood-fired pizza with local wine' }
        ],
        3: [
            { title: 'Michelin-Recommended Lunch', cost: '$75', duration: '2h', type: 'Meal', description: 'Award-winning restaurant experience' },
            { title: 'Chef\'s Tasting Menu', cost: '$85', duration: '2.5h', type: 'Meal', description: 'Multi-course lunch with wine pairing' },
            { title: 'Exclusive Private Dining', cost: '$95', duration: '2h', type: 'Meal', description: 'Private chef experience' }
        ]
    };

    const dinnerOptions = {
        1: [
            { title: 'Street Food Night Market', cost: '$15', duration: '1.5h', type: 'Meal', description: 'Explore vibrant night market with local delicacies' },
            { title: 'Cozy Local Tavern', cost: '$18', duration: '1.5h', type: 'Meal', description: 'Traditional dinner in family-run restaurant' },
            { title: 'Food Hall Experience', cost: '$20', duration: '2h', type: 'Meal', description: 'Sample multiple vendors in trendy food hall' }
        ],
        2: [
            { title: 'Waterfront Dining', cost: '$50', duration: '2h', type: 'Meal', description: 'Romantic dinner with sunset views' },
            { title: 'Live Music Restaurant', cost: '$45', duration: '2.5h', type: 'Meal', description: 'Dinner with local live entertainment' },
            { title: 'Rooftop Fine Dining', cost: '$55', duration: '2h', type: 'Meal', description: 'Upscale dinner with city lights' }
        ],
        3: [
            { title: 'Michelin Star Experience', cost: '$150', duration: '3h', type: 'Meal', description: 'World-class dining with sommelier service' },
            { title: 'Private Chef Dinner', cost: '$180', duration: '3h', type: 'Meal', description: 'Exclusive chef\'s table experience' },
            { title: 'Luxury Tasting Menu', cost: '$165', duration: '3.5h', type: 'Meal', description: '10-course tasting with rare wines' }
        ]
    };

    for (let i = 1; i <= numDays; i++) {
        // Wake-up slot
        const wakeup = {
            title: 'Morning Routine',
            type: 'Personal',
            time: '7:00 AM - 8:00 AM',
            duration: '1h',
            cost: 'Free',
            description: 'Wake up, freshen up, and prepare for the day',
            travelTime: '0 mins',
            opening: '7:00 AM',
            closing: '8:00 AM',
            holidays: 'None',
            warnings: 'Get a good night\'s sleep!',
            safeToSkip: false,
            regretProb: '5%',
            crowdDensity: '0%',
            bestTime: '7:00 AM',
            smartAlternatives: {
                late: 'Sleep in until 9 AM and skip breakfast at hotel - grab a quick coffee and pastry on the go!',
                skipped: 'If you\'re exhausted, take a rest day morning and start your activities after lunch.',
                overspent: 'Free activity - enjoy your hotel amenities or take a morning walk in the neighborhood.'
            }
        };

        // Breakfast
        const breakfastPool = breakfastOptions[budget];
        const breakfastChoice = rnd(breakfastPool);
        const breakfast = {
            ...breakfastChoice,
            time: '8:00 AM - 9:30 AM',
            travelTime: `${rndNum(5, 15)} mins`,
            opening: '7:00 AM',
            closing: '11:00 AM',
            holidays: 'None',
            warnings: 'Popular spot - arrive early on weekends!',
            safeToSkip: true,
            regretProb: '15%',
            crowdDensity: rnd(['20%', '35%', '45%']),
            bestTime: '8:00 AM',
            smartAlternatives: {
                late: 'Grab a quick coffee and croissant from a nearby bakery - 5 mins and $6!',
                skipped: 'Use hotel breakfast or buy snacks from a convenience store for $5.',
                overspent: 'Switch to street food breakfast - equally delicious, half the price!'
            }
        };

        // Morning activity
        const morning = getSlot(dest, 'Morning');
        morning.time = '10:00 AM - 1:00 PM';

        // Lunch
        const lunchPool = lunchOptions[budget];
        const lunchChoice = rnd(lunchPool);
        const lunch = {
            ...lunchChoice,
            time: '1:00 PM - 2:30 PM',
            travelTime: `${rndNum(5, 20)} mins`,
            opening: '11:30 AM',
            closing: '3:00 PM',
            holidays: 'None',
            warnings: 'Peak lunch hours - expect wait times!',
            safeToSkip: true,
            regretProb: '20%',
            crowdDensity: rnd(['40%', '60%', '75%']),
            bestTime: '1:30 PM',
            smartAlternatives: {
                late: 'Have a late lunch at 3 PM when crowds clear - many restaurants offer deals!',
                skipped: 'Grab takeaway and eat at your next attraction - saves time and money.',
                overspent: 'Pack sandwiches from a grocery store - save $20+ and picnic somewhere scenic!'
            }
        };

        // Afternoon activity
        const afternoon = getSlot(dest, 'Afternoon');
        afternoon.time = '3:00 PM - 6:00 PM';

        // Evening activity
        const evening = getSlot(dest, 'Evening');
        evening.time = '6:30 PM - 8:00 PM';

        // Dinner
        const dinnerPool = dinnerOptions[budget];
        const dinnerChoice = rnd(dinnerPool);
        const dinner = {
            ...dinnerChoice,
            time: '8:30 PM - 10:30 PM',
            travelTime: `${rndNum(10, 25)} mins`,
            opening: '6:00 PM',
            closing: '11:00 PM',
            holidays: 'None',
            warnings: 'Reservations recommended for popular spots!',
            safeToSkip: false,
            regretProb: '30%',
            crowdDensity: rnd(['50%', '70%', '85%']),
            bestTime: '7:30 PM',
            smartAlternatives: {
                late: 'Dine at 9:30 PM for a quieter atmosphere and sometimes better service!',
                skipped: 'Order room service or try the hotel restaurant - convenient after a long day.',
                overspent: 'Hit the night market instead - amazing food, half the price, authentic experience!'
            }
        };

        const dayCost = parseCost(breakfast.cost) + parseCost(morning.cost) + parseCost(lunch.cost) +
            parseCost(afternoon.cost) + parseCost(evening.cost) + parseCost(dinner.cost);
        totalActivityCost += dayCost;
        dayWiseActivityCosts.push(dayCost);

        days.push({
            day: i,
            date: new Date(start.getTime() + (i - 1) * 86400000).toDateString(),
            weather: rnd(['Sunny ☀️', 'Clear 🌤️', 'Breezy 🍃', 'Partly Cloudy ⛅']),
            wakeup,
            breakfast,
            morning,
            lunch,
            afternoon,
            evening,
            dinner
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
        localIntelligence,
        hotelSuggestions: [
            {
                name: "Grand Horizon Hotel",
                description: "A luxury experience with panoramic city views and world-class service.",
                pricePerNight: budget === 1 ? 85 : budget === 2 ? 180 : 450,
                rating: 4.8,
                amenities: ["Wifi", "Breakfast", "Pool", "Gym"],
                roomTypes: ["Standard", "Deluxe Suite"],
                location: "City Center",
                coords: { lat: 35.6762 + 0.01, lng: 139.6503 + 0.01 },
                imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 123-4567",
                address: "123 Skyline Blvd, Central District"
            },
            {
                name: "The Urban Nest",
                description: "Modern, minimalist stay designed for digital nomads and city explorers.",
                pricePerNight: budget === 1 ? 45 : budget === 2 ? 95 : 210,
                rating: 4.5,
                amenities: ["Wifi", "Work Desk", "Coffee Bar"],
                roomTypes: ["Pod", "Compact Room"],
                location: "Arts District",
                coords: { lat: 35.6762 - 0.01, lng: 139.6503 - 0.01 },
                imageUrl: "https://images.unsplash.com/photo-1551882547-ff43c61f3c33?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 987-6543",
                address: "45 Neo Way, Creative Quarter"
            },
            {
                name: "Serene Garden Inn",
                description: "Escape the bustle in this quiet oasis surrounded by lush greenery.",
                pricePerNight: budget === 1 ? 65 : budget === 2 ? 130 : 280,
                rating: 4.7,
                amenities: ["Wifi", "Tea Garden", "Spa"],
                roomTypes: ["Garden View", "Premium Cabin"],
                location: "Green Belt",
                coords: { lat: 35.6762 + 0.02, lng: 139.6503 - 0.02 },
                imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 444-2222",
                address: "88 Willow Lane, Botanical Ridge"
            },
            {
                name: "Vintage Boutique Stay",
                description: "Classic charm meets modern comfort in this historic building.",
                pricePerNight: budget === 1 ? 75 : budget === 2 ? 150 : 320,
                rating: 4.6,
                amenities: ["Wifi", "Library", "Wine Bar"],
                roomTypes: ["Classic Double", "Historic Suite"],
                location: "Old Town",
                coords: { lat: 35.6762 - 0.02, lng: 139.6503 + 0.02 },
                imageUrl: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 333-7777",
                address: "12 cobblestone St, Heritage Quarter"
            },
            {
                name: "Azure Coastal Resort",
                description: "Stunning oceanfront views with private beach access and luxury villas.",
                pricePerNight: budget === 1 ? 120 : budget === 2 ? 250 : 600,
                rating: 4.9,
                amenities: ["Wifi", "Private Beach", "Pool"],
                roomTypes: ["Ocean Villa", "Beachfront Suite"],
                location: "Coastal Rim",
                coords: { lat: 35.6762 + 0.03, lng: 139.6503 + 0.03 },
                imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 222-8888",
                address: "5 coastal Pkwy, Azure Bay"
            },
            {
                name: "Neon Nights Hostel",
                description: "Vibrant social hub for solo travelers and budget-conscious adventurers.",
                pricePerNight: budget === 1 ? 25 : budget === 2 ? 45 : 80,
                rating: 4.2,
                amenities: ["Wifi", "Bar", "Lounge"],
                roomTypes: ["Dorm Bed", "Private Pod"],
                location: "Downtown",
                coords: { lat: 35.6762 + 0.005, lng: 139.6503 - 0.005 },
                imageUrl: "https://images.unsplash.com/photo-1555854817-5b2260d1bd63?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 666-4444",
                address: "22 Flash Lane, Neon District"
            },
            {
                name: "The Golden Peak Lodge",
                description: "Cozy mountain retreat perfect for skiing and nature hikes.",
                pricePerNight: budget === 1 ? 90 : budget === 2 ? 180 : 400,
                rating: 4.7,
                amenities: ["Wifi", "Fireplace", "Ski Storage"],
                roomTypes: ["Log Cabin", "Mountain Suite"],
                location: "Highlands",
                coords: { lat: 35.6762 + 0.05, lng: 139.6503 + 0.05 },
                imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 111-9999",
                address: "Summit Rd, Peak View"
            },
            {
                name: "Metro Executive Suites",
                description: "Elegant suites tailored for business professionals in the heart of the city.",
                pricePerNight: budget === 1 ? 100 : budget === 2 ? 200 : 500,
                rating: 4.6,
                amenities: ["Wifi", "Meeting Room", "Gym"],
                roomTypes: ["Executive King", "Junior Suite"],
                location: "Financial District",
                coords: { lat: 35.6762 + 0.015, lng: 139.6503 + 0.015 },
                imageUrl: "https://images.unsplash.com/photo-1541971875076-8f97bd827dfb?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 777-1111",
                address: "50 Trade St, Metro Center"
            },
            {
                name: "Boho Chic Apartments",
                description: "Stylish and quirky apartments in the most artistic part of town.",
                pricePerNight: budget === 1 ? 55 : budget === 2 ? 110 : 250,
                rating: 4.4,
                amenities: ["Wifi", "Kitchenette", "Balcony"],
                roomTypes: ["Studio", "Art Loft"],
                location: "Creative Corner",
                coords: { lat: 35.6762 - 0.015, lng: 139.6503 - 0.015 },
                imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 888-3333",
                address: "7 Palette Lane, Artsy District"
            },
            {
                name: "Royal Heritage Palace",
                description: "Experience living like royalty in this restored 18th-century palace.",
                pricePerNight: budget === 1 ? 200 : budget === 2 ? 450 : 1200,
                rating: 5.0,
                amenities: ["Wifi", "Personal Butler", "Grand Spa"],
                roomTypes: ["Royal Suite", "Imperial Chamber"],
                location: "Palace Grounds",
                coords: { lat: 35.6762 - 0.001, lng: 139.6503 - 0.001 },
                imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 000-0001",
                address: "1 Palace Way, Royal Square"
            },
            {
                name: "Tranquil Waters B&B",
                description: "A peaceful Bed & Breakfast by the lake with homemade breakfast every morning.",
                pricePerNight: budget === 1 ? 50 : budget === 2 ? 100 : 200,
                rating: 4.5,
                amenities: ["Wifi", "Breakfast", "Lake Access"],
                roomTypes: ["Lakeview Room", "Cozy Corner"],
                location: "Lakeside",
                coords: { lat: 35.6762 + 0.04, lng: 139.6503 + 0.04 },
                imageUrl: "https://images.unsplash.com/photo-1549294413-26f195af01c1?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 444-5555",
                address: "2 Shoreline Rd, Tranquility Lake"
            },
            {
                name: "Skyline Loft",
                description: "Sky-high living with floor-to-ceiling windows and modern amenities.",
                pricePerNight: budget === 1 ? 110 : budget === 2 ? 220 : 550,
                rating: 4.8,
                amenities: ["Wifi", "Smart Home", "Gym"],
                roomTypes: ["Sky Loft", "Penthouse"],
                location: "Uptown",
                coords: { lat: 35.6762 + 0.025, lng: 139.6503 + 0.025 },
                imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 333-2222",
                address: "99 Cloud St, Skyline Plaza"
            },
            {
                name: "The Zen Garden Lodge",
                description: "Find inner peace in our Japanese-inspired garden suites and meditation halls.",
                pricePerNight: budget === 1 ? 70 : budget === 2 ? 140 : 300,
                rating: 4.8,
                amenities: ["Wifi", "Tea Garden", "Meditation Mat"],
                roomTypes: ["Tatami Room", "Garden Suite"],
                location: "East District",
                coords: { lat: 35.6762 + 0.022, lng: 139.6503 - 0.012 },
                imageUrl: "https://images.unsplash.com/photo-1503174971373-b1f69850bbd6?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 246-8135",
                address: "42 Sakura Way, Zen Valley"
            },
            {
                name: "Industrial Chic Hostel",
                description: "Raw brick walls and social vibes in a converted textile factory.",
                pricePerNight: budget === 1 ? 30 : budget === 2 ? 60 : 120,
                rating: 4.3,
                amenities: ["Wifi", "Roof Bar", "Game Room"],
                roomTypes: ["6-Bed Dorm", "Private Studio"],
                location: "Warehouse District",
                coords: { lat: 35.6762 - 0.025, lng: 139.6503 + 0.005 },
                imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 951-7532",
                address: "15 Factory St, Old Mill Area"
            },
            {
                name: "Oceanic Blue Resort",
                description: "Dive into luxury with underwater dining and crystal clear lagoon views.",
                pricePerNight: budget === 1 ? 150 : budget === 2 ? 350 : 850,
                rating: 4.9,
                amenities: ["Wifi", "Diving Gear", "Beach Bar"],
                roomTypes: ["Lagoon Villa", "Underwater Suite"],
                location: "North Coast",
                coords: { lat: 35.6762 + 0.06, lng: 139.6503 + 0.01 },
                imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 852-9630",
                address: "1 Reef Blvd, Coral Bay"
            },
            {
                name: "The Library Manor",
                description: "For the book lovers - thousands of titles and cozy reading nooks by the fire.",
                pricePerNight: budget === 1 ? 80 : budget === 2 ? 160 : 350,
                rating: 4.7,
                amenities: ["Wifi", "Library", "Reading Lounge"],
                roomTypes: ["Author's Suite", "Bookish Double"],
                location: "University Square",
                coords: { lat: 35.6762 - 0.005, lng: 139.6503 + 0.03 },
                imageUrl: "https://images.unsplash.com/photo-1568495248636-6432b90bd94e?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 741-2580",
                address: "22 Wisdom Ave, Scholar's Row"
            },
            {
                name: "Midnight City Boutique",
                description: "Dark, moody aesthetics with neon accents in the heart of the nightlife.",
                pricePerNight: budget === 1 ? 95 : budget === 2 ? 190 : 420,
                rating: 4.6,
                amenities: ["Wifi", "Night Club", "Sound System"],
                roomTypes: ["Neon Suite", "Late Check-out King"],
                location: "Club District",
                coords: { lat: 35.6762 + 0.012, lng: 139.6503 + 0.028 },
                imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 369-1472",
                address: "7 Beat St, Nightlife Hub"
            },
            {
                name: "Eco-Friendly Treehouse",
                description: "Live among the trees in this 100% sustainable and magical canopy stay.",
                pricePerNight: budget === 1 ? 110 : budget === 2 ? 220 : 480,
                rating: 4.9,
                amenities: ["Solar Power", "Organic Garden", "Eco-Spa"],
                roomTypes: ["Treehouse Loft", "Roots Cabin"],
                location: "Hidden Forest",
                coords: { lat: 35.6762 + 0.055, lng: 139.6503 - 0.035 },
                imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 159-7534",
                address: "Pine Hill, Sustainable Woods"
            },
            {
                name: "Gilded Era Grand",
                description: "Opulence and gold leaf ceilings in this restored 1920s masterpiece.",
                pricePerNight: budget === 1 ? 130 : budget === 2 ? 280 : 700,
                rating: 4.8,
                amenities: ["Wifi", "Jazz Bar", "Grand Ballroom"],
                roomTypes: ["Gatsby Suite", "Luxury Veranda"],
                location: "Historic Center",
                coords: { lat: 35.6762 - 0.01, lng: 139.6503 + 0.01 },
                imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 357-9514",
                address: "1 Prosperity Square, Old Wealth"
            },
            {
                name: "Minimalist Mono Stay",
                description: "A monochrome dream for fans of clean lines and simple living.",
                pricePerNight: budget === 1 ? 60 : budget === 2 ? 120 : 260,
                rating: 4.5,
                amenities: ["Wifi", "Gallery", "Coffee Bar"],
                roomTypes: ["White Studio", "Black Suite"],
                location: "Trendy North",
                coords: { lat: 35.6762 + 0.045, lng: 139.6503 + 0.005 },
                imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 123-7890",
                address: "8 Mono Rd, Nordic Quarter"
            },
            {
                name: "Desert Oasis Resort",
                description: "Cool pools and star-gazing decks in the heart of the warm sands.",
                pricePerNight: budget === 1 ? 95 : budget === 2 ? 210 : 540,
                rating: 4.7,
                amenities: ["Wifi", "Infinity Pool", "Observatory"],
                roomTypes: ["Dune Villa", "Oasis Suite"],
                location: "Outer Sands",
                coords: { lat: 35.6762 - 0.05, lng: 139.6503 - 0.05 },
                imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 321-6540",
                address: "Desert Rd, Star Gazer Valley"
            },
            {
                name: "High-Tech Capsule Stay",
                description: "Sleep in a pod of the future with built-in VR and AI assistants.",
                pricePerNight: budget === 1 ? 40 : budget === 2 ? 80 : 160,
                rating: 4.4,
                amenities: ["Wifi", "VR Pod", "AI Room"],
                roomTypes: ["Standard Pod", "Pro Capsule"],
                location: "Cyber Center",
                coords: { lat: 35.6762 + 0.002, lng: 139.6503 + 0.003 },
                imageUrl: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 654-3210",
                address: "Pod 101, Future Way"
            },
            {
                name: "The Artisan Bakery Inn",
                description: "Wake up to the smell of fresh bread and stay in rooms inspired by rustic kitchens.",
                pricePerNight: budget === 1 ? 55 : budget === 2 ? 115 : 240,
                rating: 4.6,
                amenities: ["Wifi", "Bakery", "Breakfast"],
                roomTypes: ["Baker's Suite", "Rustic Twin"],
                location: "Old Flour District",
                coords: { lat: 35.6762 - 0.03, lng: 139.6503 - 0.02 },
                imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 123-9876",
                address: "5 Oven St, Yeast Square"
            },
            {
                name: "Crystal Cave Hotel",
                description: "Stay in a natural limestone cave with all the modern luxuries of a 5-star resort.",
                pricePerNight: budget === 1 ? 160 : budget === 2 ? 380 : 900,
                rating: 4.9,
                amenities: ["Wifi", "Cave Spa", "Natural Pool"],
                roomTypes: ["Amethyst Room", "Crystal Suite"],
                location: "Rock Valley",
                coords: { lat: 35.6762 + 0.08, lng: 139.6503 - 0.04 },
                imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 789-1234",
                address: "Deep Rock Rd, Echo Canyon"
            },
            {
                name: "The Rooftop Oasis",
                description: "Stunning infinity pool and high-altitude dining overlooking the city skyline.",
                pricePerNight: budget === 1 ? 120 : budget === 2 ? 260 : 650,
                rating: 4.8,
                amenities: ["Wifi", "Infinity Pool", "Sky Bar"],
                roomTypes: ["Skyview King", "Panorama Suite"],
                location: "Upper West Side",
                coords: { lat: 35.6762 + 0.035, lng: 139.6503 + 0.045 },
                imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 456-7890",
                address: "500 Height St, Peak District"
            },
            {
                name: "Vintage Train Carriage Stay",
                description: "Perfectly restored 1920s train carriages converted into cozy, luxury cabins.",
                pricePerNight: budget === 1 ? 85 : budget === 2 ? 170 : 380,
                rating: 4.5,
                amenities: ["Wifi", "Dining Car", "Garden"],
                roomTypes: ["First Class Cabin", "Engine Room Loft"],
                location: "Railway Park",
                coords: { lat: 35.6762 - 0.045, lng: 139.6503 + 0.055 },
                imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 321-4567",
                address: "Platform 9, Heritage Tracks"
            },
            {
                name: "The Floating Lodge",
                description: "A unique stay on a luxury houseboat anchored in the middle of a glassy lake.",
                pricePerNight: budget === 1 ? 140 : budget === 2 ? 300 : 750,
                rating: 4.7,
                amenities: ["Wifi", "Fishing Deck", "Kitchen"],
                roomTypes: ["Captain's Quarters", "Deck Suite"],
                location: "Main Lake",
                coords: { lat: 35.6762 + 0.065, lng: 139.6503 + 0.065 },
                imageUrl: "https://images.unsplash.com/photo-1439130490301-25e322d88054?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 987-1234",
                address: "Pier 5, Mirror Lake"
            },
            {
                name: "Cyberpunk Capsule Hotel",
                description: "Drenched in purple neon and high tech, this is the ultimate futuristic city stay.",
                pricePerNight: budget === 1 ? 35 : budget === 2 ? 75 : 150,
                rating: 4.4,
                amenities: ["Wifi", "Smart Hub", "Fast Charging"],
                roomTypes: ["Neon Pod", "Advanced Capsule"],
                location: "Tech Quarter",
                coords: { lat: 35.6762 + 0.008, lng: 139.6503 + 0.008 },
                imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 654-9870",
                address: "Pod 88, Circuit Ave"
            },
            {
                name: "Medieval Castle Manor",
                description: "Thick stone walls, roaring fireplaces, and knights in armor line the halls.",
                pricePerNight: budget === 1 ? 180 : budget === 2 ? 400 : 1100,
                rating: 4.9,
                amenities: ["Wifi", "Fireplace", "Horse Riding"],
                roomTypes: ["Tower Suite", "Dungeon Loft"],
                location: "North Realm",
                coords: { lat: 35.6762 + 0.1, lng: 139.6503 - 0.1 },
                imageUrl: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 123-0000",
                address: "Castle Keep, Old Ridge"
            },
            {
                name: "The Jazz House",
                description: "Live music every night in the lobby and sound-proofed suites with vinyl players.",
                pricePerNight: budget === 1 ? 90 : budget === 2 ? 180 : 420,
                rating: 4.7,
                amenities: ["Wifi", "Live Music", "Record Collection"],
                roomTypes: ["Saxophone Suite", "Rhythm Studio"],
                location: "Culture Square",
                coords: { lat: 35.6762 - 0.008, lng: 139.6503 - 0.022 },
                imageUrl: "https://images.unsplash.com/photo-1485872232697-a781ec33a73b?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 456-1111",
                address: "12 Melody Lane, Soul District"
            },
            {
                name: "Bamboo Forest Eco-Stay",
                description: "Quiet suites tucked away in a whispering bamboo forest with natural hot springs.",
                pricePerNight: budget === 1 ? 100 : budget === 2 ? 220 : 500,
                rating: 4.8,
                amenities: ["Wifi", "Hot Spring", "Eco-Tours"],
                roomTypes: ["Forest Pavilion", "Bamboo Loft"],
                location: "Whispering Woods",
                coords: { lat: 35.6762 + 0.042, lng: 139.6503 - 0.052 },
                imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 789-5555",
                address: "Green Path, Bamboo Valley"
            },
            {
                name: "The Velvet Lounge Hotel",
                description: "Deep red velvet, gold accents, and a speakeasy hidden behind the bookshelf.",
                pricePerNight: budget === 1 ? 110 : budget === 2 ? 230 : 580,
                rating: 4.7,
                amenities: ["Wifi", "Speakeasy Bar", "Lounge"],
                roomTypes: ["Velvet Suite", "Secret Chamber"],
                location: "Hidden Alley",
                coords: { lat: 35.6762 - 0.018, lng: 139.6503 + 0.038 },
                imageUrl: "https://images.unsplash.com/photo-1549294413-26f195af01c1?auto=format&fit=crop&w=800&q=80",
                phone: "+1 (555) 321-9999",
                address: "3 Secret Lane, Velvet Quarter"
            }
        ]
    };
};

module.exports = { generateMockPlan };
