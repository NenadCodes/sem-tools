// Function to load guides from JSON
const loadGuides = async () => {
    try {
        const response = await fetch('guides/guides.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Map categories to their corresponding sections in the HTML
        const sections = {
            "backlinks": document.querySelector('#backlinks .reviews-container'),
            "competitor analysis": document.querySelector('#competitor-analysis .reviews-container'),
            "data analysis": document.querySelector('#data-analysis .reviews-container'),
            "internal linking": document.querySelector('#internal-linking .reviews-container'),
            "keyword research": document.querySelector('#keyword-research .reviews-container'),
            "on-page optimization": document.querySelector('#on-page-optimization .reviews-container'),
            "technical seo": document.querySelector('#technical-seo .reviews-container'),
            "website audit": document.querySelector('#website-audit .reviews-container')
        };

        data.forEach(guide => {
            const guideBlock = document.createElement('div');
            guideBlock.innerHTML = `
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <a href="${guide.link}" target="_blank">Read Guide</a>
            `;

            // Append the guide to the appropriate section based on category
            const sectionKey = guide.category.toLowerCase(); // Use the category directly
            if (sections[sectionKey]) {
                sections[sectionKey].appendChild(guideBlock);
            }
        });
    } catch (error) {
        console.error('Error fetching guides:', error);
    }
};

// Load guides when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGuides(); // Load guides for the guides page
}); 