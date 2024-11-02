// Sample images array (you can replace these with actual image paths)
const reviewImages = {
    "Analytics Tool Review": "images/analytics-tool.jpg",
    "SEO Tool Review": "images/seo-tool.jpg",
    "PPC Management Tool Review": "images/ppc-tool.jpg",
    "Keyword Research Tool Review": "images/keyword-tool.jpg",
    "Data Analysis Tool Review": "images/data-analysis-tool.jpg"
};

// Function to load reviews from JSON
const loadReviews = async () => {
    try {
        const response = await fetch('reviews/reviews.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const reviewsContainer = document.querySelector('.reviews-container');
        reviewsContainer.innerHTML = ''; // Clear existing content

        data.forEach(review => {
            const reviewBlock = document.createElement('div');
            const imageUrl = reviewImages[review.title] || ''; // Get the image URL from the array

            reviewBlock.innerHTML = `
                <h3>${review.title}</h3>
                <img src="${imageUrl}" alt="${review.title}" style="width: 100%; height: auto; border-radius: 5px;"/> <!-- Add image -->
                <p>${review.description}</p>
                <a href="${review.link}">Read Review</a>
            `;
            reviewsContainer.appendChild(reviewBlock);
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

// Load reviews when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadReviews(); // Load reviews for the reviews page
});
