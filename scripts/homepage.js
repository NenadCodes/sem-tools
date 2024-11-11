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
                            frameborder="1" 
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

// Function to load blog posts from JSON
const loadBlogPosts = async () => {
    try {
        const response = await fetch('blog/blog-posts.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const blogContainer = document.querySelector('.blog-container');
        blogContainer.innerHTML = ''; // Clear existing content
        data.forEach(post => {
            const postBlock = document.createElement('div');
            postBlock.innerHTML = `
                <h3><a href="${post.link}">${post.title}</a></h3> <!-- Make the title clickable -->
                <p>${post.excerpt}</p>
            `;
            blogContainer.appendChild(postBlock);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
};

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



// Load data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadReviews(); // Load reviews for the homepage
    loadBlogPosts(); // Load blog posts for the homepage
    loadTools(); // Load featured tools for the homepage
});