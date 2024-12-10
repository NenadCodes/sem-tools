const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const { keywords, numResults } = JSON.parse(event.body);
        
        // Make a request to Google Search
        const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(keywords)}&num=${numResults}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Load the response data into Cheerio
        const $ = cheerio.load(response.data);

        const urls = [];
        // Extract URLs from the search results
        $('h3').each((index, element) => {
            const parent = $(element).parent();
            const url = parent.attr('href');
            if (url) {
                urls.push(url);
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ urls }),
        };
    } catch (error) {
        console.error('Error occurred while scraping:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to scrape data' }),
        };
    }
};