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

// Load blog posts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts(); // Load blog posts for the blog page
});