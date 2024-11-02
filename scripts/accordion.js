// Accordion functionality
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