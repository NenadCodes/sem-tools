// Function to load guides by category from JSON
const loadGuidesByCategory = async (category) => {
    try {
        const response = await fetch('../guides.json'); // Adjusted path to guides.json
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const guidesContainer = document.querySelector('.reviews-container');
        guidesContainer.innerHTML = ''; // Clear existing content

        // Filter guides by category
        const filteredGuides = data.filter(guide => guide.category === category);
        filteredGuides.forEach(guide => {
            const guideBlock = document.createElement('div');
            guideBlock.innerHTML = `
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <a href="${guide.link}">Read Guide</a>
            `;
            guidesContainer.appendChild(guideBlock);
        });

        // Handle case where no guides are found
        if (filteredGuides.length === 0) {
            guidesContainer.innerHTML = '<p>No guides found for this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching guides by category:', error);
    }
};

// Load guides when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const categoryMap = {
        'Backlinks Guides': 'backlinks-guides',
        'Competitor Analysis Guides': 'competitor-analysis-guides',
        'Data Analysis Guides': 'data-analysis-guides',
        'Internal Linking Guides': 'internal-linking-guides',
        'Keyword Research Guides': 'keyword-research-guides',
        'On-Page Optimization Guides': 'on-page-optimization-guides',
        'Technical SEO Guides': 'technical-seo-guides',
        'Website Audit Guides': 'website-audit-guides'
    };

    // Check for specific page titles to load guides by category
    for (const [title, category] of Object.entries(categoryMap)) {
        if (document.title.includes(title)) {
            loadGuidesByCategory(category); // Load guides for the matched category
            break; // Exit loop once a match is found
        }
    }
});
