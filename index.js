// ===== DROPDOWN ACCORDION (MOBILE) + HOVER (DESKTOP) ===== //
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let isMobile = window.innerWidth <= 768;

    // Handle clicks/hovers
    function handleDropdownInteractions() {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const content = dropdown.querySelector('.dropdown-content');

            // MOBILE: Click to toggle (accordion behavior)
            if (isMobile) {
                // Remove hover events first
                dropdown.removeEventListener('mouseenter', showDropdown);
                dropdown.removeEventListener('mouseleave', hideDropdown);

                // Click event
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent document click from closing immediately

                    // Close all other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
            }
            // DESKTOP: Hover to show
            else {
                // Remove click events first
                link.removeEventListener('click', handleClick);

                // Hover events
                dropdown.addEventListener('mouseenter', showDropdown);
                dropdown.addEventListener('mouseleave', hideDropdown);
            }
        });
    }

    // Show dropdown (desktop)
    function showDropdown() {
        // Close all others first
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        // Open current
        this.classList.add('active');
    }

    // Hide dropdown (desktop)
    function hideDropdown() {
        this.classList.remove('active');
    }

    // Close all when clicking outside (both mobile + desktop)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Initialize and update on resize
    handleDropdownInteractions();
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 768;
        handleDropdownInteractions();
    });
});