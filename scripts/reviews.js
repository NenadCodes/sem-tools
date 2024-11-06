// Function to load reviews from JSON
const loadReviews = async () => {
    try {
        const response = await fetch('reviews/reviews.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const reviewsContainer = document.querySelector('.reviews-container');
        reviewsContainer.innerHTML = ''; // Clear existing content

        data.forEach(review => {
            const videoId = review.link.split('be/')[1] || review.link.split('v=')[1]?.split('&')[0]; // Extract video ID from the link

            if (videoId) {
                const videoBlock = document.createElement('div');
                videoBlock.innerHTML = `
                    <h3>${review.title}</h3>
                    <div style="position: relative; width: 100%; padding-bottom: 56.25%; /* 16:9 Aspect Ratio */">
                        <iframe 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                            frameborder="0" 
                            allowfullscreen 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                        </iframe>
                    </div>
                    <p>${review.description}</p>
                `;
                reviewsContainer.appendChild(videoBlock);
            }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

// Load reviews when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadReviews(); // Load reviews for the reviews page
});
