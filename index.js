// ===== COMBINED SYSTEM =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize variables
    const dropdowns = document.querySelectorAll('.dropdown');
    let isMobile = window.innerWidth <= 768;

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

    // 3. Work section functions
    function showWorkSection(id) {
        // Close all works first
        document.querySelectorAll('.member-work').forEach(work => {
            work.classList.remove('active');
        });
        
        // Show the requested one
        const targetWork = document.getElementById(id);
        if (targetWork) {
            targetWork.classList.add('active');
            setTimeout(() => {
                targetWork.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    // 4. Unified event handlers
    function handleMemberLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        // Update URL
        history.pushState(null, null, '#' + targetId);
        
        // Show the work section
        showWorkSection(targetId);
        
        // Reset view all mode
        const dropdownContent = this.closest('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.classList.remove('view-all-mode');
            const btn = dropdownContent.querySelector('.group-view-all');
            if (btn) btn.textContent = 'View All Group Works';
        }
    }

    function handleBackLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        history.pushState(null, null, '#');
        
        // Close all works
        document.querySelectorAll('.member-work').forEach(work => {
            work.classList.remove('active');
        });
        
        // Scroll to list
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    }

    // 5. Setup functions
    function setupDropdowns() {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            if (isMobile) {
                link.addEventListener('click', function(e) {
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

    function setupMemberWorks() {
        // View All toggle
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

        // Member links
        document.querySelectorAll('.member-link').forEach(link => {
            link.addEventListener('click', handleMemberLinkClick);
        });

        // Back links
        document.querySelectorAll('.back-link').forEach(link => {
            link.addEventListener('click', handleBackLinkClick);
        });
    }

    // 6. Event listeners
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    window.addEventListener('resize', function() {
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile !== isMobile) {
            isMobile = nowMobile;
            setupDropdowns();
        }
    });

    window.addEventListener('popstate', function() {
        if (window.location.hash) {
            showWorkSection(window.location.hash.substring(1));
        } else {
            document.querySelectorAll('.member-work').forEach(work => {
                work.classList.remove('active');
            });
        }
    });

    // 7. Initial setup
    setupDropdowns();
    setupMemberWorks();
    
    // Handle initial page load with hash
    if (window.location.hash) {
        showWorkSection(window.location.hash.substring(1));
    }

    console.log('Combined system initialized successfully');
});