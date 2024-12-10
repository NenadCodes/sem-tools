const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5501; // Change to an unused port

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

async function getGoogleSearchResults(query, numResults = 10) {
    console.log(`Searching for: ${query}`); // Debugging line
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&num=${numResults}`);

    // Wait for the search results to load
    await page.waitForSelector('h3');

    // Extract URLs from the search results
    const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h3')).map(h3 => {
            const parent = h3.parentElement;
            return parent ? parent.href : null;
        }).filter(url => url);
    });

    console.log(`Found URLs: ${urls}`); // Debugging line
    await browser.close();
    return urls;
}

async function extractData(url) {
    console.log(`Extracting data from: ${url}`); // Debugging line
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract the page title
    const title = await page.title();
    console.log(`Page title: ${title}`); // Debugging line

    // Extract headings
    const headings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => `${h.tagName}: ${h.innerText.trim()}`);
    });

    console.log(`Headings: ${headings.join(', ')}`); // Debugging line
    await browser.close();
    return { title, headings: headings.join('\n') };
}

app.post('/scrape', async (req, res) => {
    console.log('Received request to scrape with keywords:', req.body.keywords); // Debugging line
    const keywords = req.body.keywords.split(',').map(keyword => keyword.trim());
    const results = [];

    for (const keyword of keywords) {
        console.log(`Processing keyword: ${keyword}`); // Debugging line
        const urls = await getGoogleSearchResults(keyword, 10);
        for (const url of urls) {
            const { title, headings } = await extractData(url);
            results.push({ URL: url, Title: title, Headings: headings });
        }
    }

    // Generate CSV data
    const csvContent = results.map(result => `${result.URL},${result.Title},"${result.Headings}"`).join('\n');
    
    console.log('Generated CSV data:', csvContent); // Debugging line
    // Return the results as JSON
    res.json({ data: results, csvData: csvContent });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
}); 