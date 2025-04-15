document.addEventListener('DOMContentLoaded', function() {
    // ========== SLIDESHOW ==========
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlides() {
        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        
        // Update index
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        
        // Show current slide
        slides[slideIndex-1].style.display = 'block';
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
        
        // Auto-advance every 5 seconds
        setTimeout(showSlides, 5000);
    }
    
    // Manual controls
    document.querySelector('.prev').addEventListener('click', () => {
        slideIndex -= 2;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        showSlides();
    });
    
    document.querySelector('.next').addEventListener('click', () => {
        showSlides();
    });
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            showSlides();
        });
    });
    
    // Initialize
    showSlides();

    // ========== DROPDOWNS ==========
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.matchMedia("(max-width: 768px)").matches) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdowns.forEach(d => d !== dropdown && d.classList.remove('active'));
                dropdown.classList.toggle('active');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }

    // ========== POPUPS ==========
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content-container');
    
    document.querySelectorAll('.member-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Load content into popup (replace with your actual content)
            popupContent.innerHTML = `<h3>${this.textContent}</h3><p>Student details here...</p>`;
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    document.querySelector('.close-popup').addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
        if (e.target === popup) closePopup();
    });
    
    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});