// Function to load tools by category from JSON
const loadToolsByCategory = async (category) => {
    try {
        const response = await fetch('../tools/tools.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const toolsContainer = document.querySelector('.tools-container');
        toolsContainer.innerHTML = ''; // Clear existing content

        // Filter tools by category
        const filteredTools = data.filter(tool => {
            // Check if the tool has a categories array
            if (tool.categories) {
                // If it has categories, include it if the current category is in the array
                return tool.categories.includes(category);
            } else {
                // If it doesn't have categories, check the single category
                return tool.category === category; // Assuming you still have a single category property
            }
        });

        filteredTools.forEach(tool => {
            const toolBlock = document.createElement('div');
            toolBlock.classList.add('tool-box'); // Add the tool-box class for styling
            toolBlock.innerHTML = `
                <a href="${tool.link}">
                    <img src="${tool.image.src}" 
                         alt="${tool.image.alt}" 
                         width="${tool.image.width}" 
                         height="${tool.image.height}" 
                         style="width: 100%; height: auto; border-radius: 5px;"/> <!-- Make image clickable -->
                </a>
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <a href="${tool.link}" target="_blank" class="read-review-button">Read Review</a> <!-- Button to read review -->
            `;
            toolsContainer.appendChild(toolBlock);
        });

        // Handle case where no tools are found
        if (filteredTools.length === 0) {
            toolsContainer.innerHTML = '<p>No tools found for this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching tools by category:', error);
    }
};

// Load tools when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const categoryMap = {
        'All SEM Tools': 'all',
        'Analytics and Reporting Tools': 'analytics-and-reporting',
        'Competitor Analysis Tools': 'competitor-analysis',
        'Free Scripts': 'scripts',
        'Free Tools': 'free-tools',
        'Keyword Research Tools': 'keyword-research',
        'PPC Management Tools': 'ppc-management',
        'Search Engine Optimization': 'search-engine-optimization'
    };

    // Check for specific page titles to load tools by category
    for (const [title, category] of Object.entries(categoryMap)) {
        if (document.title.includes(title)) {
            loadToolsByCategory(category); // Load tools for the matched category
            break; // Exit loop once a match is found
        }
    }
});
