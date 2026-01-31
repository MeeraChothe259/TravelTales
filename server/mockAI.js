const generateMockPlan = (data) => {
    const { destination, startDate, endDate, partners, mood, budget, preferences } = data;

    // Helper to get random item
    const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Determine Budget Level
    const budgetLevel = budget === 1 ? 'Budget' : budget === 2 ? 'Moderate' : 'Luxury';
    const dailyCost = budget === 1 ? 80 : budget === 2 ? 180 : 450;

    // Generate Days (Mocking 3 days for now)
    const days = [];
    for (let i = 1; i <= 3; i++) {
        let activities = [];

        if (mood === 'chill') {
            activities = [
                { time: '10:00 AM', title: 'Late Breakfast at Local Cafe', icon: 'coffee' },
                { time: '01:00 PM', title: `Stroll through ${destination} Parks`, icon: 'walk' },
                { time: '04:00 PM', title: 'Sunset Views & Relaxation', icon: 'sunset' },
                { time: '08:00 PM', title: 'Casual Dinner', icon: 'dinner' }
            ];
        } else if (mood === 'adventure') {
            activities = [
                { time: '07:00 AM', title: 'Mountain Hiking / Trekking', icon: 'mountain' },
                { time: '12:00 PM', title: 'Quick Energy Lunch', icon: 'lunch' },
                { time: '02:00 PM', title: 'Kayaking or City Exploration', icon: 'water' },
                { time: '07:00 PM', title: 'Local Street Food Tour', icon: 'food' }
            ];
        } else {
            // Default/Mixed
            activities = [
                { time: '09:00 AM', title: `Visit Famous Landmarks in ${destination}`, icon: 'landmark' },
                { time: '01:00 PM', title: 'Lunch at Top Rated Spot', icon: 'lunch' },
                { time: '03:00 PM', title: 'Museum or Shopping', icon: 'bag' },
                { time: '08:00 PM', title: 'Fine Dining Experience', icon: 'wine' }
            ];
        }

        days.push({
            day: i,
            date: new Date(new Date(startDate).getTime() + (i - 1) * 86400000).toDateString(),
            weather: rnd(['Sunny ☀️', 'Partly Cloudy ⛅', 'Clear Skies 🌤️']),
            activities: activities
        });
    }

    // Combine preferences and safety for highlights
    let allHighlights = preferences.length > 0 ? [...preferences] : ['Culture', 'Food', 'Scenery'];
    if (data.safety && data.safety.length > 0) {
        allHighlights = [...allHighlights, ...data.safety];
    }

    return {
        tripName: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Trip to ${destination}`,
        destination,
        dates: `${startDate} to ${endDate}`,
        travelers: partners,
        vibe: mood,
        budgetSummary: {
            total: dailyCost * 3 * (partners === 'Solo' ? 1 : 2), // Rough estimate
            perPerson: dailyCost * 3,
            level: budgetLevel,
            currency: 'USD'
        },
        itinerary: days,
        highlights: allHighlights
    };
};

module.exports = { generateMockPlan };
