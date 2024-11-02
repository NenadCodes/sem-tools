// Function to load guides from JSON
const loadGuides = async () => {
    try {
        const response = await fetch('guides/guides.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const guidesContainer = document.querySelector('.guides-container');
        guidesContainer.innerHTML = ''; // Clear existing content
        data.forEach(guide => {
            const guideBlock = document.createElement('div');
            guideBlock.innerHTML = `
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <a href="${guide.link}">Read Guide</a>
            `;
            guidesContainer.appendChild(guideBlock);
        });
    } catch (error) {
        console.error('Error fetching guides:', error);
    }
};

// Load guides when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGuides(); // Load guides for the guides page
});