// Mobile dropdown toggle (accordion behavior - only one open at a time)
document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) { // Only for mobile
            e.preventDefault();
            
            const parentDropdown = this.parentElement;
            const isOpen = parentDropdown.classList.contains('active');
            
            // Close ALL dropdowns first
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Open the clicked dropdown only if it was closed
            if (!isOpen) {
                parentDropdown.classList.add('active');
            }
        }
    });
});

// Close dropdowns when clicking outside (works for both mobile & desktop)
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});