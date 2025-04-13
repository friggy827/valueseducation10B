// ===== COMBINED DROPDOWN + WORKS SYSTEM ===== //
document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize variables
    const dropdowns = document.querySelectorAll('.dropdown');
    
    function checkIfMobile() {
        return window.innerWidth <= 768;
    }
    let isMobile = checkIfMobile();

    // 2. Core dropdown functions
    function closeAllDropdowns(exceptThis = null) {
        dropdowns.forEach(dropdown => {
            if (exceptThis && dropdown === exceptThis) return;
            dropdown.classList.remove('active');
            
            // Reset view mode when closing
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.classList.remove('view-all-mode');
                const btn = content.querySelector('.group-view-all');
                if (btn) btn.textContent = 'View All Group Works';
            }
        });
    }

    // 3. Setup dropdown behavior
    function setupDropdowns() {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            if (isMobile) {
                newLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const wasActive = this.parentElement.classList.contains('active');
                    closeAllDropdowns();
                    if (!wasActive) this.parentElement.classList.add('active');
                });
            } else {
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

    // 4. Member works system
    function setupMemberWorks() {
        document.querySelectorAll('.group-view-all').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdownContent = this.closest('.dropdown-content');
                dropdownContent.classList.toggle('view-all-mode');
                
                this.textContent = dropdownContent.classList.contains('view-all-mode') 
                    ? 'Show Individual View' 
                    : 'View All Group Works';
                
                dropdownContent.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        document.querySelectorAll('.member-link').forEach(link => {
            link.addEventListener('click', function() {
                const dropdownContent = this.closest('.dropdown-content');
                dropdownContent.classList.remove('view-all-mode');
                const btn = dropdownContent.querySelector('.group-view-all');
                if (btn) btn.textContent = 'View All Group Works';
            });
        });
    }

    // 5. Event delegation
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    window.addEventListener('resize', function() {
        const nowMobile = checkIfMobile();
        if (nowMobile !== isMobile) {
            isMobile = nowMobile;
            setupDropdowns();
        }
    });

    // 6. Initial setup
    setupDropdowns();
    setupMemberWorks();
    
    console.log('Combined dropdown system initialized');
    // Remove this alert in production:
    alert('Dropdown and member works system loaded!'); 
});
