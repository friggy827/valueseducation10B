// Simple Popup System
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content-container');
    
    // Convert existing member-work divs into templates
    const studentTemplates = {};
    document.querySelectorAll('.member-work').forEach(work => {
      const id = work.id.replace('-work', '');
      studentTemplates[id] = work.innerHTML;
      work.remove(); // Remove original divs
    });
  
    // Click handler for all member links
    document.querySelectorAll('.member-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const studentId = this.getAttribute('data-student');
        popupContent.innerHTML = studentTemplates[studentId];
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Close handlers
    document.querySelector('.close-popup').addEventListener('click', closePopup);
    popup.addEventListener('click', e => e.target === popup && closePopup());
    document.addEventListener('keydown', e => e.key === 'Escape' && closePopup());
  
    function closePopup() {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });