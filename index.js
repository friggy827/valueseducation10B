document.addEventListener('DOMContentLoaded', function() {
    // ===== POPUP FUNCTIONALITY =====
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content-container');
    const closeBtn = document.querySelector('.close-popup');
    
    // Store templates
    const studentTemplates = {};
    document.querySelectorAll('.member-work').forEach(work => {
        studentTemplates[work.id] = work.innerHTML;
    });

    // Click handler for member links
    document.querySelectorAll('.member-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const studentId = this.getAttribute('data-student') + '-work';
            
            if (studentTemplates[studentId]) {
                popupContent.innerHTML = studentTemplates[studentId];
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close handlers
    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
        if (e.target === popup) closePopup();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closePopup();
    });

    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // ===== DROPDOWN FUNCTIONALITY =====
    const dropdowns = document.querySelectorAll('.dropdown');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdowns.forEach(d => d.classList.remove('active'));
                dropdown.classList.toggle('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }
});