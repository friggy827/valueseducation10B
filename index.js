// Close dropdowns when clicking outside (for desktop)
document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) { // Only for desktop
        const dropdowns = document.querySelectorAll('.dropdown');
        let clickedInsideDropdown = false;

        // Check if the click was inside any dropdown
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(e.target)) {
                clickedInsideDropdown = true;
            }
        });

        // If clicked outside, close all dropdowns
        if (!clickedInsideDropdown) {
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            });
        }
    }
});

// Close other dropdowns when hovering a new one (for desktop)
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) { // Only for desktop
            document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                if (otherDropdown !== this) {
                    otherDropdown.querySelector('.dropdown-content').style.display = 'none';
                }
            });
        }
    });
});