

async function testAutocomplete() {
    console.log("Testing Autocomplete...");
    try {
        const response = await fetch('http://localhost:5005/api/location-autocomplete?query=Eiffel%20Tower');
        const data = await response.json();
        console.log("Autocomplete Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Autocomplete Error:", error);
    }
}

async function testGenerate() {
    console.log("\nTesting Generate Activity...");
    try {
        const response = await fetch('http://localhost:5005/api/generate-activity-details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: {
                    name: "Eiffel Tower",
                    fullName: "Eiffel Tower, Paris, France",
                    coordinates: { lat: 48.8584, lng: 2.2945 }
                },
                timeSlot: "morning",
                budget: 2,
                preferences: []
            })
        });
        const data = await response.json();
        console.log("Generate Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Generate Error:", error);
    }
}

(async () => {
    await testAutocomplete();
    await testGenerate();
})();
