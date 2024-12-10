const chromium = require('chrome-aws-lambda'); // Use chrome-aws-lambda for serverless environments

exports.handler = async (event, context) => {
    try {
        // Parse the incoming request body
        const { keywords, numResults } = JSON.parse(event.body);

        // Launch the browser with chrome-aws-lambda settings
        const browser = await chromium.puppeteer.launch({
            args: [...chromium.args],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
        });

        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keywords)}&num=${numResults}`);

        // Wait for the search results to load
        await page.waitForSelector('h3');

        // Extract URLs from the search results
        const urls = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h3')).map(h3 => {
                const parent = h3.parentElement;
                return parent ? parent.href : null;
            }).filter(url => url);
        });

        await browser.close();

        // Return the extracted URLs as a JSON response
        return {
            statusCode: 200,
            body: JSON.stringify({ urls }),
        };
    } catch (error) {
        console.error('Error occurred while scraping:', error); // Log the error for debugging
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to scrape data' }),
        };
    }
};
