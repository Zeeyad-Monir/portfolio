/* ==========================
   CUSTOM CURSOR
   ========================== */
   document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    }
  
    /* ==========================
       EXPERIENCE CAROUSEL
       ========================== */
    (function initExperienceCarousel() {
      const experienceCarousel = document.querySelector('.carousel');
      if (!experienceCarousel) return;
  
      const experienceCards = experienceCarousel.querySelectorAll('.experience-card');
      if (!experienceCards.length) return;
  
      const experienceDots = document.querySelectorAll('.pagination-dots button');
      const experienceLeftArrow = document.getElementById('experience-left-arrow');
      const experienceRightArrow = document.getElementById('experience-right-arrow');
      let experienceCurrentIndex = 0;
  
      function updateExperienceCarousel() {
        experienceCards.forEach((card, index) => {
          card.classList.remove('prev2', 'prev', 'active', 'next', 'next2');
  
          if (index === experienceCurrentIndex) {
            card.classList.add('active');
          } else if (index === (experienceCurrentIndex - 1 + experienceCards.length) % experienceCards.length) {
            card.classList.add('prev');
          } else if (index === (experienceCurrentIndex - 2 + experienceCards.length) % experienceCards.length) {
            card.classList.add('prev2');
          } else if (index === (experienceCurrentIndex + 1) % experienceCards.length) {
            card.classList.add('next');
          } else if (index === (experienceCurrentIndex + 2) % experienceCards.length) {
            card.classList.add('next2');
          }
        });
  
        experienceDots.forEach(dot => dot.classList.remove('active'));
        if (experienceDots[experienceCurrentIndex]) {
          experienceDots[experienceCurrentIndex].classList.add('active');
        }
      }
  
      function showNextExperienceCard() {
        experienceCurrentIndex = (experienceCurrentIndex + 1) % experienceCards.length;
        updateExperienceCarousel();
      }
  
      function showPrevExperienceCard() {
        experienceCurrentIndex = (experienceCurrentIndex - 1 + experienceCards.length) % experienceCards.length;
        updateExperienceCarousel();
      }
  
      experienceDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          experienceCurrentIndex = index;
          updateExperienceCarousel();
        });
      });
  
      if (experienceLeftArrow) {
        experienceLeftArrow.addEventListener('click', showPrevExperienceCard);
      }
      if (experienceRightArrow) {
        experienceRightArrow.addEventListener('click', showNextExperienceCard);
      }
  
      updateExperienceCarousel();
    })();
  
    /* ==========================
       TYPING EFFECT
       ========================== */
    (function initTypingEffect() {
      const roles = ['Front End Developer', 'UI/UX Designer'];
      let roleIndex = 0;
      let charIndex = 0;
      let currentRole = '';
      let isDeleting = false;
      const target = document.getElementById('role-animation');
      if (!target) return; // If element not found, skip
  
      function typeRole() {
        if (!isDeleting && charIndex <= roles[roleIndex].length) {
          currentRole = roles[roleIndex].substring(0, charIndex++);
          target.innerHTML = currentRole;
          setTimeout(typeRole, 100);
        } else if (isDeleting && charIndex > 0) {
          currentRole = roles[roleIndex].substring(0, charIndex--);
          target.innerHTML = currentRole;
          setTimeout(typeRole, 60);
        } else if (!isDeleting && charIndex > roles[roleIndex].length) {
          isDeleting = true;
          setTimeout(typeRole, 1000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeRole, 500);
        }
      }
      typeRole();
    })();
  
    /* ==========================
       STARFIELD BACKGROUND
       ========================== */
    (function initStarfield() {
      const canvas = document.getElementById('starfield');
      if (!canvas) return; // No starfield canvas -> skip
  
      const ctx = canvas.getContext('2d');
      let stars = [];
      let w, h;
  
      function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
  
      function createStars() {
        stars = [];
        for (let i = 0; i < 150; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: Math.random() * 1.8,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2
          });
        }
      }
      createStars();
  
      function animate() {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
  
        ctx.fillStyle = '#FFFFFF';
        for (let s of stars) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
  
          s.x += s.vx;
          s.y += s.vy;
  
          if (s.x < 0) s.x = w;
          if (s.x > w) s.x = 0;
          if (s.y < 0) s.y = h;
          if (s.y > h) s.y = 0;
        }
        requestAnimationFrame(animate);
      }
      animate();
    })();
  
    /* ==========================
       SKILLS INFINITE SCROLL
       ========================== */
    (function initSkillsScroll() {
      const skillsTrack = document.querySelector('.skills-track');
      if (!skillsTrack) return;
  
      // Duplicate the content for seamless scrolling
      skillsTrack.innerHTML += skillsTrack.innerHTML;
      let offset = 0;
  
      function animateSkills() {
        offset += 0.5; // Adjust speed as needed (pixels per frame)
        if (offset >= skillsTrack.scrollWidth / 2) {
          offset = 0;
        }
        skillsTrack.style.transform = `translateX(-${offset}px)`;
        requestAnimationFrame(animateSkills);
      }
      animateSkills();
    })();
  });
  