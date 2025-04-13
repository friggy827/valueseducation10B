document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content-container');
    
    // Student data for all groups
    const studentWorks = {
      // ===== GROUP 1 =====
      arnold: `
        <div class="student-profile">
          <img src="https://drive.google.com/uc?export=view&id=1BP_dAnQuOVgpRuaSoOM9L4yTSG-al1gB" 
               class="student-photo"
               alt="Arnold Ang">
          <div class="student-info">
            <h4>Arnold Ang</h4>
            <div class="student-id">#1 | Group 1</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Cultural Harmony Project</h5>
                <p>"This project explores the intersection of Filipino and Chinese values in our community..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      peter: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Peter Li">
          <div class="student-info">
            <h4>Peter Li</h4>
            <div class="student-id">#6 | Group 1</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Honesty Journal</h5>
                <p>"My weekly honesty journal tracks situations where I chose integrity..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      // ===== GROUP 2 =====
      hendrix: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Hendrix Escolar">
          <div class="student-info">
            <h4>Hendrix Escolar</h4>
            <div class="student-id">#2 | Group 2</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Web Accessibility</h5>
                <p>"Redesigning our school website taught me that technology must serve everyone..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      schuyler: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Schuyler Li">
          <div class="student-info">
            <h4>Schuyler Li</h4>
            <div class="student-id">#7 | Group 2</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Environmental Ethics</h5>
                <p>"Our family business switched to sustainable packaging..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      // ===== GROUP 3 =====
      jerome: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Jerome Go">
          <div class="student-info">
            <h4>Jerome Go</h4>
            <div class="student-id">#3 | Group 3</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Sportsmanship Values</h5>
                <p>"As basketball team captain, I've learned leadership means elevating everyone..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      martin: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Martin Lim">
          <div class="student-info">
            <h4>Martin Lim</h4>
            <div class="student-id">#8 | Group 3</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Financial Ethics</h5>
                <p>"Analyzing the 2008 financial crisis showed how short-term profits can destroy trust..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      // ===== GROUP 4 =====
      jazz: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Jazz Ibo">
          <div class="student-info">
            <h4>Jazz Ibo</h4>
            <div class="student-id">#4 | Group 4</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Creative Storytelling</h5>
                <p>"My project uses modern animation techniques to retell traditional folk tales..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      elvis: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Elvis Lu">
          <div class="student-info">
            <h4>Elvis Lu</h4>
            <div class="student-id">#9 | Group 4</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Music and Values</h5>
                <p>"I composed original songs that represent different moral values..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      // ===== GROUP 5 =====
      einer: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Einer Lagamayo">
          <div class="student-info">
            <h4>Einer Lagamayo</h4>
            <div class="student-id">#5 | Group 5</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Community Service</h5>
                <p>"Organized a neighborhood clean-up program involving 50+ volunteers..."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      wawai: `
        <div class="student-profile">
          <img src="https://via.placeholder.com/150" 
               class="student-photo"
               alt="Wawai Qui">
          <div class="student-info">
            <h4>Wawai Qui</h4>
            <div class="student-id">#10 | Group 5</div>
            <div class="work-content">
              <div class="work-section">
                <h5>Cultural Preservation</h5>
                <p>"Documented traditional crafts from our indigenous communities..."</p>
              </div>
            </div>
          </div>
        </div>
      `
      // Add other students following the same pattern...
    };
  
    // Open popup
    document.querySelectorAll('.member-link').forEach(link => {
      link.addEventListener('click', function() {
        const student = this.dataset.student;
        if (studentWorks[student]) {
          popupContent.innerHTML = studentWorks[student];
          popup.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        } else {
          popupContent.innerHTML = `<p>Content not available yet for this student.</p>`;
          popup.style.display = 'flex';
        }
      });
    });
  
    // Close popup
    document.querySelector('.close-popup').addEventListener('click', function() {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    // Close when clicking outside
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.style.display === 'flex') {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });