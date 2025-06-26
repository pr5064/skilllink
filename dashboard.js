document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav ul li a');
    const sections = document.querySelectorAll('.card'); // Assuming cards are main sections

    // Function to show/hide sections
    const showSection = (sectionId) => {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'flex'; // Use flex for card display
            } else if (sectionId === 'dashboard') {
                // For the 'Dashboard' link, show all cards
                section.style.display = 'flex';
            }
            else {
                section.style.display = 'none';
            }
        });
    };

    // Handle clicks on sidebar navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior (page reload)

            // Remove 'active' class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Get the target section ID from the data-section attribute
            const targetSection = this.getAttribute('data-section');

            if (targetSection) {
                showSection(targetSection);
            } else {
                // For "Settings" or "Logout" where there's no corresponding section to show
                console.log(`${this.textContent.trim()} clicked`);
                // You would implement specific logic for these actions here (e.g., redirect, open modal)
            }
        });
    });

    // Set initial active state based on URL hash or default to Dashboard
    const currentHash = window.location.hash.substring(1); // Get hash without '#'
    if (currentHash && document.getElementById(currentHash)) {
        // If a valid hash exists and corresponds to a section
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === currentHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        showSection(currentHash);
    } else {
        // Default to showing the dashboard and activating its link
        const dashboardLink = document.querySelector('.sidebar-nav ul li a[data-section="dashboard"]');
        if (dashboardLink) {
            dashboardLink.classList.add('active');
        }
        showSection('dashboard'); // Show all cards initially by default
    }
});