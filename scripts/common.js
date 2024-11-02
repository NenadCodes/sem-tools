// Toggle navigation menu
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active'); // Toggle the active class
    });
}
