const axios = require('axios');
require('dotenv').config();

const fetchDestinationImage = async (query) => {
    try {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!accessKey || accessKey === 'your_unsplash_key_here') return null;

        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                per_page: 1,
                orientation: 'landscape'
            },
            headers: {
                Authorization: `Client-ID ${accessKey}`
            }
        });

        if (response.data.results && response.data.results.length > 0) {
            return response.data.results[0].urls.regular;
        }
        return null;
    } catch (error) {
        console.error("Unsplash Error:", error.message);
        return null;
    }
};

module.exports = { fetchDestinationImage };
