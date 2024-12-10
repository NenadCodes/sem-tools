const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
    try {
        const { keywords, numResults } = JSON.parse(event.body);
        const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(keywords)}&num=${numResults}`);
        const $ = cheerio.load(response.data);

        const urls = [];
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
