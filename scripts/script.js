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
            reviewBlock.innerHTML = `
                <h3>${review.title}</h3>
                <p>${review.description}</p>
                <a href="${review.link}">Read Review</a>
            `;
            reviewsContainer.appendChild(reviewBlock);
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
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="${post.link}">Read More</a>
            `;
            blogContainer.appendChild(postBlock);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
};

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

// Function to load tools from JSON
const loadTools = async () => {
    try {
        const response = await fetch('tools/tools.json'); // Correct path to tools.json
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const toolsContainer = document.querySelector('.tools-container');
        toolsContainer.innerHTML = ''; // Clear existing content
        data.forEach(tool => {
            const toolBlock = document.createElement('div');
            toolBlock.innerHTML = `
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <a href="${tool.link}" target="_blank">Visit Tool</a>
            `;
            toolsContainer.appendChild(toolBlock);
        });
    } catch (error) {
        console.error('Error fetching tools:', error);
    }
};

// Function to load tools by category from JSON
const loadToolsByCategory = async (category) => {
    try {
        const response = await fetch('../tools/tools.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const toolsContainer = document.querySelector('.tools-container');
        toolsContainer.innerHTML = ''; // Clear existing content
        const filteredTools = data.filter(tool => tool.category === category);
        filteredTools.forEach(tool => {
            const toolBlock = document.createElement('div');
            toolBlock.innerHTML = `
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <a href="${tool.link}" target="_blank">Visit Tool</a>
            `;
            toolsContainer.appendChild(toolBlock);
        });
    } catch (error) {
        console.error('Error fetching tools by category:', error);
    }
};

// Function to load guides by category from JSON
const loadGuidesByCategory = async (category) => {
    try {
        const response = await fetch('../guides.json'); // Adjusted path to guides.json
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const guidesContainer = document.querySelector('.guides-container');
        guidesContainer.innerHTML = ''; // Clear existing content

        // Filter guides by category
        const filteredGuides = data.filter(guide => guide.category === category);
        filteredGuides.forEach(guide => {
            const guideBlock = document.createElement('div');
            guideBlock.innerHTML = `
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <a href="${guide.link}">Read Guide</a>
            `;
            guidesContainer.appendChild(guideBlock);
        });
    } catch (error) {
        console.error('Error fetching guides by category:', error);
    }
};

// Load data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the homepage
    if (document.title.includes('SEM Tools Reviews and Guides')) {
        loadReviews(); // Load reviews for the homepage
        loadBlogPosts(); // Load blog posts for the homepage
    } else if (document.title.includes('SEM Tools Reviews')) {
        loadReviews(); // Load reviews for the reviews page
    } else if (document.title.includes('SEM Tools Blog')) {
        loadBlogPosts(); // Load blog posts for the blog page
    } else if (document.title.includes('All Guides')) {
        loadGuides(); // Load guides for the guides page
    } else if (document.title.includes('All SEM Tools')) {
        loadTools(); // Load tools for the all-tools page
    } else if (document.title.includes('Analytics and Reporting Tools')) {
        loadToolsByCategory('analytics-and-reporting'); // Load tools for the analytics-and-reporting page
    }
    else if (document.title.match('Competitor Analysis Tools')) {
        loadToolsByCategory('competitor-analysis'); // Load tools for Competitor Analysis Page
    }    
    else if (document.title.includes('Free Scripts')) {
        loadToolsByCategory('scripts'); // Load tools for the Scripts
    } 
    else if (document.title.includes('Free Tools')) {
        loadToolsByCategory('free-tools'); // Load tools for the Free Tools page
    } 
    else if (document.title.match('Keyword Research Tools')) {
        loadToolsByCategory('keyword-research'); // Load tools for the Free Tools page
    } 
    else if (document.title.match('PPC Management Tools')) {
        loadToolsByCategory('ppc-management'); // Load tools for the Free Tools page
    } 
    else if (document.title.includes('Search Engine Optimization')) {
        loadToolsByCategory('search-engine-optimization'); // Load tools for the Free Tools page
    } 
    else if (document.title.match('Backlinks Guides')) {
        loadGuidesByCategory('backlinks-guides'); // Load guides for the Backlinks page
    } else if (document.title.match('Competitor Analysis Guides')) {
        loadGuidesByCategory('competitor-analysis-guides'); // Load guides for the Competitor Analysis page
    } else if (document.title.match('Data Analysis Guides')) {
        loadGuidesByCategory('data-analysis-guides'); // Load guides for the Data Analysis page
    } else if (document.title.match('Internal Linking Guides')) {
        loadGuidesByCategory('internal-linking-guides'); // Load guides for the Internal Linking page
    } else if (document.title.match('Keyword Research Guides')) {
        loadGuidesByCategory('keyword-research-guides'); // Load guides for the Keyword Research page
    } else if (document.title.match('On-Page Optimization Guides')) {
        loadGuidesByCategory('on-page-optimization-guides'); // Load guides for the On-Page Optimization page
    } else if (document.title.match('Technical SEO Guides')) {
        loadGuidesByCategory('technical-seo-guides'); // Load guides for the Technical SEO page
    } else if (document.title.match('Website Audit Guides')) {
        loadGuidesByCategory('website-audit-guides'); // Load guides for the Website Audit page
    }
});

// Toggle navigation menu
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('active'); // Toggle the active class
});


// Accordion
document.addEventListener("DOMContentLoaded", function() {
    const accordionTitles = document.querySelectorAll('.accordion-title');

    accordionTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Toggle the open attribute on the parent accordion item
            const accordionItem = this.parentElement;
            accordionItem.toggleAttribute('open');

            // Get the associated content
            const content = this.nextElementSibling;

            // Toggle the display of the content
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});