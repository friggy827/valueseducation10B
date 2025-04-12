// ===== GUARANTEED DROPDOWN SOLUTION ===== //
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const isMobile = window.innerWidth <= 768;

    // Mobile click handler
    if (isMobile) {
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('a');
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close all other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    } 
    // Desktop hover handler
    else {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                // Close all others
                dropdowns.forEach(other => {
                    other.classList.remove('active');
                });
                // Open this one
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
});