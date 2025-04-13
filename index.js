document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content-container');
    const closeBtn = document.querySelector('.close-popup');
    
    // Store templates
    const studentTemplates = {};
    
    // Get all member work sections
    document.querySelectorAll('.member-work').forEach(work => {
        const id = work.id;
        studentTemplates[id] = work.innerHTML;
    });

    // Click handler for member links
    document.querySelectorAll('.member-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const studentId = this.getAttribute('href').replace('#', '');
            
            if (studentTemplates[studentId]) {
                popupContent.innerHTML = studentTemplates[studentId];
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});