const loadToolsToUse = async () => {
    // Get the tools section and its category
    const toolsSection = document.querySelector('#tools-to-use');
    const category = toolsSection.getAttribute('data-category'); // Get the category from the data attribute

    // Define a mapping of categories to their corresponding use values
    const categoryToUseMap = {
        "backlink-analysis": "analysing-backlinks",
        "technical-seo": "technical-seo",
        "keyword-research": "keyword-research",
        "competitor-analysis": "competitor-analysis",
        "data-analysis": "data-analysis",
        "internal-link-analysis": "internal-link-analysis",
        "on-page-analysis": "on-page-analysis",
        "technical-seo-analysis": "technical-seo-analysis",
        "website-audit": "website-audit",
        "ppc-management": "ppc-management"
    };

    // Check if the category exists in the mapping
    const useValue = categoryToUseMap[category];

    if (!useValue) {
        console.error('No valid category specified for loading tools.');
        return; // Exit if no valid category is found
    }

    try {
        const response = await fetch('../../tools/tools.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const tools = await response.json();
        const toolsContainer = toolsSection.querySelector('.tools-container');
        toolsContainer.innerHTML = ''; // Clear existing content

        // Filter tools based on the "use" or "uses" parameter
        const filteredTools = tools.filter(tool => 
            (tool.use === useValue) || 
            (tool.uses && tool.uses.includes(useValue))
        );

        // Populate the tools container with the filtered tools
        filteredTools.forEach(tool => {
            const toolBlock = document.createElement('div');
            toolBlock.classList.add('tool-box'); // Add the tool-box class for styling
            toolBlock.innerHTML = `
                <a href="${tool.link}" target="_blank">
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
        console.error('Error loading tools:', error);
    }
};

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadToolsToUse);
