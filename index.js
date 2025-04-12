// ===== ERROR-FREE DROPDOWN SOLUTION ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown elements
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Check if mobile view
    function checkIfMobile() {
        return window.innerWidth <= 768;
    }
    let isMobile = checkIfMobile();

    // Close all dropdowns except one if specified
    function closeAllDropdowns(exceptThis = null) {
        dropdowns.forEach(dropdown => {
            if (exceptThis && dropdown === exceptThis) return;
            dropdown.classList.remove('active');
        });
    }

    // Setup event listeners for current device type
    function setupDropdownListeners() {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            // First remove any existing listeners to prevent duplicates
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Mobile behavior
            if (isMobile) {
                newLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const wasActive = this.parentElement.classList.contains('active');
                    
                    closeAllDropdowns();
                    
                    if (!wasActive) {
                        this.parentElement.classList.add('active');
                    }
                });
            } 
            // Desktop behavior
            else {
                dropdown.addEventListener('mouseenter', function() {
                    closeAllDropdowns();
                    this.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                });
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        const nowMobile = checkIfMobile();
        if (nowMobile !== isMobile) {
            isMobile = nowMobile;
            setupDropdownListeners();
        }
    });

    // Initial setup
    setupDropdownListeners();
    
    // Debug confirmation
    console.log('Dropdown system initialized successfully');
    alert('Dropdown system loaded!'); // Remove this after testing
});

// Keep your existing slideshow code below this