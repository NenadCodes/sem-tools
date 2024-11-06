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
            toolBlock.classList.add('tool-box'); // Add the tool-box class for styling
            toolBlock.innerHTML = `

                <a href="${tool.link}">
                    <img src="${tool.image.src}" 
                         alt="${tool.image.alt}" 
                         width="${tool.image.width}" 
                         height="${tool.image.height}" 
                         style="width: 90%; height: auto; border-radius: 5px;"/> <!-- Make image clickable -->
                </a>
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
        const maxIndex = tools.length - Math.floor(carousel.clientWidth / itemWidth); // Calculate max index based on visible items
        currentIndex = Math.min(currentIndex, maxIndex); // Ensure currentIndex does not exceed maxIndex
        const offset = -currentIndex * itemWidth; // Calculate offset
        carousel.style.transform = `translateX(${offset}px)`; // Apply the transform to the carousel
    };

    // Event listeners for carousel buttons
    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        const itemWidth = tools[0].clientWidth + 20; // Width of each item plus margin
        const maxIndex = tools.length - Math.floor(carousel.clientWidth / itemWidth); // Calculate max index
        if (currentIndex < maxIndex) {
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
