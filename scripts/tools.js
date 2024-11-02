// Function to load tools from JSON
const loadTools = async () => {
    try {
        const response = await fetch('tools/tools.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const toolsContainer = document.querySelector('.tools-container');
        toolsContainer.innerHTML = ''; // Clear existing content

        data.forEach(tool => {
            const toolBlock = document.createElement('div');
            toolBlock.classList.add('tool-box'); // Add the tool-box class for styling

            toolBlock.innerHTML = `
                <h3>${tool.title}</h3>
                <a href="${tool.link}" target="_blank">
                    <img src="${tool.image.src}" 
                         alt="${tool.image.alt}" 
                         width="${tool.image.width}" 
                         height="${tool.image.height}" 
                         style="width: 100%; height: auto; border-radius: 5px;"/> <!-- Make image clickable -->
                </a>
                <p>${tool.description}</p>
                <a href="${tool.link}" target="_blank" class="read-review-button">Read Review</a> <!-- Button to read review -->
            `;
            toolsContainer.appendChild(toolBlock);
        });
    } catch (error) {
        console.error('Error fetching tools:', error);
    }
};

// Load tools when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTools(); // Load tools for the tools page
});
