document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.body.className = '';

    initializeSlideshow();
    initializeDropdowns();
    initializeMemberPopups();
    initializeGroupViewAll();
});

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

    window.plusSlides = (n) => { clearInterval(slideInterval); showSlides(slideIndex += n); startAutoAdvance(); };
    window.currentSlide = (n) => { clearInterval(slideInterval); showSlides(slideIndex = n); startAutoAdvance(); };

    showSlides(slideIndex);
    startAutoAdvance();

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
    const worksContainer = document.querySelector('div[style*="display:none"]');
    if (worksContainer) worksContainer.style.display = 'block';

    document.querySelectorAll('.member-links').forEach(group => {
        const groupNum = group.id.match(/\d+/)?.[0];
        if (!groupNum) return;
        if (group.nextElementSibling?.classList.contains('view-all-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'view-all-btn';
        btn.textContent = `View All Group ${groupNum} Works`;
        btn.dataset.group = groupNum;

        btn.style.cssText = `
            margin: 10px 0 15px 0;
            width: 100%;
            max-width: 250px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            padding: 10px 15px;
            background-color: #1a3e72;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s;
            text-align: center;
        `;

        group.parentNode.insertBefore(btn, group.nextSibling);

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const works = Array.from(document.querySelectorAll(`.member-work[id$="-work"]`)).filter(work => {
                const studentId = work.id.replace('-work', '');
                return document.querySelector(`.member-link[data-student="${studentId}"]`)?.closest('.member-links')?.id === `group${groupNum}-list`;
            });

            if (works.length === 0) return;

            const popupContent = document.getElementById('popup-content-container');
            const popup = document.getElementById('popup');
            
            popupContent.innerHTML = `
                <div class="group-works-container">
                    <h2>Group ${groupNum} Works</h2>
                    ${works.map(work => `
                        <div class="group-work-entry">
                            ${work.innerHTML}
                        </div>
                    `).join('')}
                </div>
            `;

            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

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
    popupContent.scrollTop = 0;
}
