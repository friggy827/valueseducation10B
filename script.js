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