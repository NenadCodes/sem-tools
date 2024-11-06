// Function to load all guides from JSON and display them in corresponding sections
const loadAllGuides = async () => {
    try {
        const response = await fetch('guides/guides.json'); // Adjust the path if necessary
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Map categories to their corresponding sections in the HTML
        const sections = {
            "backlinks-guides": document.querySelector('#backlinks .reviews-container'),
            "competitor-analysis-guides": document.querySelector('#competitor-analysis .reviews-container'),
            "data-analysis-guides": document.querySelector('#data-analysis .reviews-container'),
            "internal-linking-guides": document.querySelector('#internal-linking .reviews-container'),
            "keyword-research-guides": document.querySelector('#keyword-research .reviews-container'),
            "on-page-optimization-guides": document.querySelector('#on-page-optimization .reviews-container'),
            "technical-seo-guides": document.querySelector('#technical-seo .reviews-container'),
            "website-audit-guides": document.querySelector('#website-audit .reviews-container')
        };

        // Clear existing content in all sections
        Object.values(sections).forEach(container => {
            container.innerHTML = ''; // Clear existing content
        });

        // Append guides to the appropriate section based on category
        data.forEach(guide => {
            const guideBlock = document.createElement('div');
            guideBlock.innerHTML = `
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <a href="${guide.link}" target="_blank">Read Guide</a>
            `;

            // Use the category directly to find the correct section
            const sectionKey = guide.category; // Use the category as is from the JSON
            if (sections[sectionKey]) {
                sections[sectionKey].appendChild(guideBlock);
            }
        });

        // Handle case where no guides are found for a section
        Object.entries(sections).forEach(([key, container]) => {
            if (container.children.length === 0) {
                const noGuidesMessage = document.createElement('p');
                noGuidesMessage.textContent = 'No guides found for this category.';
                container.appendChild(noGuidesMessage);
            }
        });
    } catch (error) {
        console.error('Error fetching guides:', error);
    }
};

// Load guides when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadAllGuides(); // Load all guides for the guides page
});