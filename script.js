// SLIDESHOW FUNCTIONALITY
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  
  // Wrap around if at end
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Update dot indicators
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show current slide
  if (slides.length > 0) {
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
}

// Navigation functions
function plusSlides(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex += n);
  startAutoAdvance();
}

function currentSlide(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex = n);
  startAutoAdvance();
}

// Auto-advance
function startAutoAdvance() {
  slideInterval = setInterval(() => {
    plusSlides(1);
  }, 5000); // Change slide every 5 seconds
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  showSlides(slideIndex);
  startAutoAdvance();
  
  // Touch support for mobile
  const slideshow = document.querySelector('.slideshow-container');
  let touchStartX = 0;
  let touchEndX = 0;
  
  slideshow.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
  }, {passive: true});
  
  slideshow.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoAdvance();
  }, {passive: true});
  
  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) plusSlides(1);
    if (touchEndX > touchStartX + threshold) plusSlides(-1);
  }
});

document.addEventListener('DOMContentLoaded', function() {

    let slideIndex = 1;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideInterval;
    
    // Initialize slideshow
    showSlides(slideIndex);
    startAutoAdvance();
    
    function showSlides(n) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }
    
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    function startAutoAdvance() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, isMobile ? 7000 : 5000);
    }
    
    // Touch swipe support
    const slideshow = document.querySelector('.slideshow-container');
    
    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });
    
    slideshow.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoAdvance();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            plusSlides(1);
        } else if (touchEndX > touchStartX + threshold) {
            plusSlides(-1);
        }
    }

    // ===== DROPDOWN FUNCTIONALITY =====
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other dropdowns first
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

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