function loadNavbar() {
    const header = document.getElementById('navbar');
    if (!header) return;

    header.innerHTML = `
        <div class="logo">
            <a href="/index.html">
                <img src="/images/sem-tools-logo.png" alt="SEM Tools Logo" width="182" height="57" style="max-width: 100%; height: auto;" />
            </a>
        </div>
        <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
        <nav>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/reviews.html">Reviews</a></li>
                <li>
                    <a href="#" class="dropdown-toggle">Tools</a>
                    <ul class="dropdown">
                        <li><a href="/all-tools.html">All Tools</a></li>
                        <li><a href="/search-engine-optimization/index.html">SEO</a></li>
                        <li><a href="/analytics-and-reporting/index.html">Analytics and Reporting</a></li>
                        <li><a href="/competitor-analysis/index.html">Competitor Analysis</a></li>
                        <li><a href="/keyword-research/index.html">Keyword Research</a></li>
                        <li><a href="/ppc-management/index.html">PPC Management</a></li>
                        <li><a href="/free-tools/index.html">Free Tools</a></li>
                        <li><a href="/free-scripts/index.html">Free Scripts</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="dropdown-toggle">Guides</a>
                    <ul class="dropdown">
                        <li><a href="/guides.html">All Guides</a></li>
                        <li><a href="/guides/backlinks/index.html">Backlinks</a></li>
                        <li><a href="/guides/competitor-analysis/index.html">Competitor Analysis</a></li>
                        <li><a href="/guides/data-analysis/index.html">Data Analysis</a></li>
                        <li><a href="/guides/internal-linking/index.html">Internal Linking</a></li>
                        <li><a href="/guides/keyword-research/index.html">Keyword Research</a></li>
                        <li><a href="/guides/on-page-optimization/index.html">On-Page Optimization</a></li>
                        <li><a href="/guides/technical-seo/index.html">Technical SEO</a></li>
                        <li><a href="/guides/website-audit/index.html">Website Audit</a></li>
                    </ul>
                </li>
                <li><a href="/blog.html">Blog</a></li>
                <li><a href="/about-me.html">About</a></li>
                <li><a href="/contact.html">Contact</a></li>
            </ul>
        </nav>
    `;

    const navToggle = header.querySelector('.nav-toggle');
    const nav = header.querySelector('nav');

    // Mobile menu open/close
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
    });

    function closeAllDropdowns() {
        header.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        header.querySelectorAll('.dropdown-toggle.open-parent').forEach(l => l.classList.remove('open-parent'));
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            nav.classList.remove('active');
            closeAllDropdowns();
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            nav.classList.remove('active');
            closeAllDropdowns();
        }
    });

    // Mobile: accordion dropdown toggle
    header.querySelectorAll('.dropdown-toggle').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.getComputedStyle(navToggle).display !== 'none') {
                const dropdown = link.nextElementSibling;
                if (!dropdown) return;
                const isOpen = dropdown.classList.contains('open');
                closeAllDropdowns();
                if (!isOpen) {
                    dropdown.classList.add('open');
                    link.classList.add('open-parent');
                }
            }
        });
    });

    // Mobile: close nav when a page link is clicked
    header.querySelectorAll('nav a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Highlight the active page link
    const currentPath = window.location.pathname;
    header.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === '#') return;
        try {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
                link.classList.add('active');
            }
        } catch (e) {}
    });
}

loadNavbar();
