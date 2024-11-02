// Function to load tools from JSON
const loadTools = async () => {
    try {
        const response = await fetch('../tools/tools.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const carousel = document.querySelector('.carousel'); // Updated to target the new carousel class
        carousel.innerHTML = ''; // Clear existing content

        // Create tool blocks
        data.forEach(tool => {
            const toolBlock = document.createElement('div');
            toolBlock.innerHTML = `
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <a href="${tool.link}" target="_blank">Visit Tool</a>
            `;
            carousel.appendChild(toolBlock); // Append to the carousel
        });

        // Initialize carousel functionality
        initCarousel();
    } catch (error) {
        console.error('Error fetching tools:', error);
    }
};

// Function to initialize carousel functionality
const initCarousel = () => {
    const carousel = document.querySelector('.carousel'); // Updated to target the new carousel class
    const tools = carousel.children; // Get the children of the carousel
    let currentIndex = 0;

    // Function to update the carousel display
    const updateCarousel = () => {
        const itemWidth = tools[0].clientWidth + 20; // Width of each item plus margin
        const offset = -currentIndex * itemWidth; // Calculate offset
        carousel.style.transform = `translateX(${offset}px)`; // Apply the transform to the carousel
    };

    // Event listeners for carousel buttons
    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        if (currentIndex < tools.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
};

// Load tools when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTools(); // Load tools for the tools page
});
