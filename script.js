// MAIN INITIALIZATION - UPDATED
document.addEventListener('DOMContentLoaded', function() {
    // Reset popup state first
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Clear any residual body classes
    document.body.className = '';
    
    // Initialize features
    initializeSlideshow();
    initializeDropdowns();
    initializeMemberPopups();
    initializeGroupViewAll(); // Only use this one, remove initializeViewAllButtons()
});

// SLIDESHOW FUNCTIONALITY
function initializeSlideshow() {
    let slideIndex = 1;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlides(n) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        Array.from(slides).forEach(slide => slide.style.display = "none");
        Array.from(dots).forEach(dot => dot.classList.remove("active"));
        
        if (slides[slideIndex-1]) {
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1]?.classList.add("active");
        }
    }

    function startAutoAdvance() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => plusSlides(1), 
            window.matchMedia("(max-width: 768px)").matches ? 7000 : 5000);
    }

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) plusSlides(1);
        if (touchEndX > touchStartX + threshold) plusSlides(-1);
    }

    // Public functions
    window.plusSlides = (n) => { clearInterval(slideInterval); showSlides(slideIndex += n); startAutoAdvance(); };
    window.currentSlide = (n) => { clearInterval(slideInterval); showSlides(slideIndex = n); startAutoAdvance(); };

    // Initialize
    showSlides(slideIndex);
    startAutoAdvance();
    
    // Touch support
    const slideshow = document.querySelector('.slideshow-container');
    if (slideshow) {
        slideshow.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
        slideshow.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoAdvance();
        }, {passive: true});
    }
}

// DROPDOWN FUNCTIONALITY
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link?.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdowns.forEach(d => d !== dropdown && d.classList.remove('active'));
            dropdown.classList.toggle('active');
        });
    });
    
    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

// POPUP FUNCTIONALITY
function initializeMemberPopups() {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content-container');
    const closeBtn = document.querySelector('.close-popup');
    
    if (!popup || !popupContent) return;

    function showPopup(content) {
        popupContent.innerHTML = content;
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Individual member popups
    document.querySelectorAll('.member-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const studentId = this.getAttribute('data-student') + '-work';
            const content = document.getElementById(studentId)?.innerHTML;
            if (content) showPopup(content);
        });
    });

    closeBtn?.addEventListener('click', closePopup);
    popup.addEventListener('click', e => e.target === popup && closePopup());
    document.addEventListener('keydown', e => e.key === 'Escape' && closePopup());
}

function initializeGroupViewAll() {
    // First unhide the works container
    const worksContainer = document.querySelector('div[style*="display:none"]');
    if (worksContainer) worksContainer.style.display = 'block';

    // Create buttons for each group
    document.querySelectorAll('.member-links').forEach(group => {
        const groupNum = group.id.match(/\d+/)?.[0];
        if (!groupNum) return;

        const btn = document.createElement('button');
        btn.className = 'view-all-btn';
        btn.textContent = `View All Group ${groupNum} Works`;
        btn.dataset.group = groupNum;
        group.parentNode.insertBefore(btn, group.nextSibling);

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Compile all works for this group
            const works = Array.from(document.querySelectorAll(`.member-work[data-group="${groupNum}"]`));
            if (works.length === 0) return;
            
            // Create popup content
            const popupContent = document.getElementById('popup-content-container');
            popupContent.innerHTML = `
                <div class="group-works-container">
                    <h2>Group ${groupNum} Works</h2>
                    ${works.map(work => `
                        <div class="group-work-entry">
                            <h3>${work.querySelector('.student-info h4')?.textContent || 'Student Work'}</h3>
                            ${work.innerHTML}
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Reset scroll and show
            popupContent.scrollTop = 0;
            document.getElementById('popup').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Tag works with groups
    document.querySelectorAll('.member-work').forEach(work => {
        const studentId = work.id.split('-')[0];
        const group = document.querySelector(`.member-link[data-student="${studentId}"]`)
            ?.closest('.member-links')?.id?.match(/\d+/)?.[0];
        if (group) work.dataset.group = group;
    });
}

function showPopup(content) {
    const popupContent = document.getElementById('popup-content-container');
    popupContent.innerHTML = content;
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset scroll position
    popupContent.scrollTop = 0;
}
