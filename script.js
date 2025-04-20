document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - starting initialization');

    // 1. Add View All buttons to each group
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        const groupList = dropdown.querySelector('.member-links');
        if (!groupList) {
            console.warn('Missing .member-links in dropdown:', dropdown);
            return;
        }

        const groupNum = groupList.id.match(/\d+/)?.[0];
        if (!groupNum) {
            console.warn('Cannot extract group number from:', groupList.id);
            return;
        }

        console.log(`Processing Group ${groupNum}`);

        // Create and insert button
        const btn = document.createElement('button');
        btn.className = 'view-works-btn';
        btn.textContent = `View All Group ${groupNum} Works`;
        btn.dataset.group = groupNum;
        dropdown.appendChild(btn);

        // Add click handler
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Button clicked for Group ${groupNum}`);

            const body = document.body;
            const showClass = `show-group-${groupNum}`;
            const isShowing = body.classList.contains(showClass);

            console.log(`Current state: ${isShowing ? 'Showing' : 'Hidden'}`);

            body.classList.toggle(showClass);
            btn.textContent = isShowing 
                ? `View All Group ${groupNum} Works` 
                : `Hide Group ${groupNum} Works`;

            // Debug output
            console.log('Body classes:', body.className);
            console.log(`Member works for group ${groupNum}:`, 
                document.querySelectorAll(`[data-group="${groupNum}"]`));
        });
    });

    // 2. Tag each work with its group
    console.log('Tagging member works with groups...');
    document.querySelectorAll('.member-work').forEach(work => {
        try {
            const studentId = work.id.split('-')[0];
            const memberLink = document.querySelector(`[data-student="${studentId}"]`);
            
            if (!memberLink) {
                console.warn(`No member link found for: ${work.id}`);
                return;
            }

            const groupList = memberLink.closest('.member-links');
            if (!groupList) {
                console.warn(`No group list found for: ${work.id}`);
                return;
            }

            const groupNum = groupList.id.match(/\d+/)?.[0];
            if (!groupNum) {
                console.warn(`Cannot extract group number from: ${groupList.id}`);
                return;
            }

            work.dataset.group = groupNum;
            console.log(`Tagged ${work.id} with group ${groupNum}`);
        } catch (error) {
            console.error(`Error processing ${work.id}:`, error);
        }
    });
});

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

// Debug version of the view-all functionality
function debugViewAll() {
    console.log("Initializing debug mode...");
    
    // 1. Make sure all works are visible in DOM
    const hiddenDiv = document.querySelector('div[style="display:none;"]');
    if (hiddenDiv) {
      hiddenDiv.style.display = 'block';
      console.log("Unhid the works container");
    }
  
    // 2. Enhanced button click handler
    document.querySelectorAll('.view-works-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        const groupNum = this.dataset.group;
        console.log(`Button clicked for Group ${groupNum}`);
        
        // Toggle visibility
        document.body.classList.toggle(`show-group-${groupNum}`);
        
        // Force show works
        document.querySelectorAll(`[data-group="${groupNum}"]`).forEach(work => {
          work.style.display = 'block';
          work.style.opacity = '1';
        });
        
        console.log(`Toggled Group ${groupNum} works`);
      });
    });
  }
  
  // Run after page loads
  window.addEventListener('load', debugViewAll);