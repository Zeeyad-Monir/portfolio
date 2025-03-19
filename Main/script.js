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
       MOBILE NAVIGATION - iOS OPTIMIZED
       ========================== */
    function initMobileNavigation() {
      const menuButton = document.getElementById('mobile-menu-button');
      const navOverlay = document.getElementById('mobile-nav-overlay');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      
      // Debug info - helps troubleshoot if elements are found
      console.log('Menu button found:', !!menuButton);
      console.log('Nav overlay found:', !!navOverlay);
      
      if (!menuButton || !navOverlay) {
        console.log('Mobile nav elements not found');
        return;
      }
      
      // Ensure menu is properly reset on page load
      menuButton.classList.remove('active');
      navOverlay.classList.remove('active');
      
      // Multiple event listeners with iOS optimizations
      function toggleMenu(e) {
        console.log('Toggle menu called');
        
        // Prevent any default actions
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        // Force redraw for iOS
        menuButton.style.display = 'none';
        menuButton.offsetHeight; // Trigger reflow
        menuButton.style.display = '';
        
        const isActive = menuButton.classList.contains('active');
        
        // Toggle active states
        if (!isActive) {
          menuButton.classList.add('active');
          navOverlay.classList.add('active');
          
          // For iOS devices, handle fixed position
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          document.body.style.top = `-${window.scrollY}px`;
          
          // Staggered animation for nav links
          mobileNavLinks.forEach((link, index) => {
            setTimeout(() => {
              link.style.opacity = '1';
              link.style.transform = 'translateY(0)';
            }, 50 * (index + 1));
          });
        } else {
          menuButton.classList.remove('active');
          navOverlay.classList.remove('active');
          
          // Restore scroll position
          const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.top = '';
          document.body.style.overflow = '';
          window.scrollTo(0, scrollY);
          
          // Reset link animations
          mobileNavLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
          });
        }
      }
      
      // Clean up any existing event listeners
      // Using a cloned node to ensure all listeners are gone
      if (menuButton) {
        const newButton = menuButton.cloneNode(true);
        if (menuButton.parentNode) {
          menuButton.parentNode.replaceChild(newButton, menuButton);
        }
      }
      
      // Re-acquire reference to the new button
      const freshMenuButton = document.getElementById('mobile-menu-button');
      
      if (freshMenuButton) {
        // Add multiple event types for better iOS support
        // Add event listeners with capture phase for iOS
        freshMenuButton.addEventListener('click', toggleMenu, { capture: true });
        freshMenuButton.addEventListener('touchstart', function(e) {
          console.log('Touchstart detected');
          toggleMenu(e);
        }, { passive: false, capture: true });
        
        // Add a direct attribute for iOS
        freshMenuButton.setAttribute('onclick', 'window.toggleMobileMenu(event)');
      }
      
      // Fix for child elements of the button
      const hamburgerIcon = document.querySelector('.hamburger-icon');
      const hamburgerSpans = document.querySelectorAll('.hamburger-icon span');
      
      if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent bubbling
          toggleMenu(e);
        }, { capture: true });
        
        hamburgerIcon.addEventListener('touchstart', function(e) {
          e.stopPropagation(); // Prevent bubbling
          toggleMenu(e);
        }, { passive: false, capture: true });
      }
      
      if (hamburgerSpans.length) {
        hamburgerSpans.forEach(span => {
          span.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent bubbling
            toggleMenu(e);
          }, { capture: true });
          
          span.addEventListener('touchstart', function(e) {
            e.stopPropagation(); // Prevent bubbling
            toggleMenu(e);
          }, { passive: false, capture: true });
        });
      }
      
      // Close menu when a link is clicked
      mobileNavLinks.forEach(link => {
        function closeMenu(e) {
          // Don't prevent default here to allow navigation
          const activeButton = document.getElementById('mobile-menu-button');
          const activeOverlay = document.getElementById('mobile-nav-overlay');
          
          if (activeButton) activeButton.classList.remove('active');
          if (activeOverlay) activeOverlay.classList.remove('active');
          
          // Restore scroll
          const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.top = '';
          document.body.style.overflow = '';
          window.scrollTo(0, scrollY);
          
          // Reset link animations
          document.querySelectorAll('.mobile-nav-link').forEach(navLink => {
            navLink.style.opacity = '0';
            navLink.style.transform = 'translateY(20px)';
          });
        }
        
        // Clean up existing listeners using cloned node
        const newLink = link.cloneNode(true);
        if (link.parentNode) {
          link.parentNode.replaceChild(newLink, link);
        }
      });
      
      // Re-acquire all nav links after replacement
      const freshNavLinks = document.querySelectorAll('.mobile-nav-link');
      freshNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const activeButton = document.getElementById('mobile-menu-button');
          const activeOverlay = document.getElementById('mobile-nav-overlay');
          
          if (activeButton) activeButton.classList.remove('active');
          if (activeOverlay) activeOverlay.classList.remove('active');
          
          // Restore scroll
          const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.top = '';
          document.body.style.overflow = '';
          window.scrollTo(0, scrollY);
        });
      });
      
      // Create a direct click handler for the inline onclick method
      window.toggleMobileMenu = function(event) {
        console.log('Global toggleMobileMenu called');
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        toggleMenu(event);
        return false; // prevent default
      };
    }
  
    // Run initialization
    initMobileNavigation();
    
    // Also run it after a short delay to ensure everything is loaded
    setTimeout(initMobileNavigation, 500);
    
    // Additional timer for iOS devices which sometimes need more time
    setTimeout(initMobileNavigation, 1500);
  
    /* ==========================
       EXPERIENCE CAROUSEL WITH TOUCH SUPPORT
       ========================== */
    (function initExperienceCarousel() {
      const carouselContainer = document.querySelector('.carousel-container');
      const experienceCarousel = document.querySelector('.carousel');
      if (!experienceCarousel) return;
  
      const experienceCards = experienceCarousel.querySelectorAll('.experience-card');
      if (!experienceCards.length) return;
  
      const experienceDots = document.querySelectorAll('.pagination-dots button');
      const experienceLeftArrow = document.getElementById('experience-left-arrow');
      const experienceRightArrow = document.getElementById('experience-right-arrow');
      let experienceCurrentIndex = 0;
      
      // Touch and wheel tracking variables
      let touchStartX = 0;
      let touchEndX = 0;
      let isDragging = false;
      let wheelTimeout = null;
      let wheelDirection = 0;
      let lastWheelTime = 0;
      
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
  
        // Update pagination dots
        experienceDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === experienceCurrentIndex);
        });
      }
  
      function showNextExperienceCard() {
        experienceCurrentIndex = (experienceCurrentIndex + 1) % experienceCards.length;
        updateExperienceCarousel();
      }
  
      function showPrevExperienceCard() {
        experienceCurrentIndex = (experienceCurrentIndex - 1 + experienceCards.length) % experienceCards.length;
        updateExperienceCarousel();
      }

      
    // FIXED Mouse wheel event handler
function handleWheel(event) {
  // Get the element that triggered the wheel event
  const targetElement = event.target;
  
  // Check if the wheel event originated within the carousel container
  const isCarouselEvent = carouselContainer.contains(targetElement);
  
  // Only proceed if we're directly interacting with the carousel
  if (!isCarouselEvent) return;
  
  // Check if the carousel is in viewport
  const rect = carouselContainer.getBoundingClientRect();
  const isInViewport = (
    rect.top <= window.innerHeight && 
    rect.bottom >= 0 && 
    rect.left <= window.innerWidth && 
    rect.right >= 0
  );
  
  if (!isInViewport) return;
  
  const now = Date.now();
  const deltaX = event.deltaX || 0;
  const deltaY = event.deltaY || 0;
  
  // ONLY respond to horizontal scrolling
  // Check if horizontal scrolling is significant
  if (Math.abs(deltaX) > 5 && Math.abs(deltaX) > Math.abs(deltaY)) {
    // Debounce wheel events
    if (now - lastWheelTime > 50) {
      wheelDirection = deltaX > 0 ? 1 : -1;
    }
    lastWheelTime = now;
    
    // Clear any pending timeout
    if (wheelTimeout) {
      clearTimeout(wheelTimeout);
    }
    
    // Set a timeout to actually move the carousel
    wheelTimeout = setTimeout(() => {
      if (wheelDirection > 0) {
        showNextExperienceCard();
      } else {
        showPrevExperienceCard();
      }
      wheelDirection = 0;
    }, 100);
    
    // Prevent default scrolling only for horizontal movement
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  
  // Allow vertical scrolling to pass through normally
}
      
      // Touch event handlers for mobile
      function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        isDragging = true;
      }
      
      function handleTouchMove(event) {
        if (!isDragging) return;
        
        const touchX = event.touches[0].clientX;
        const diff = touchStartX - touchX;
        
        // If we're making a significant horizontal swipe
        if (Math.abs(diff) > 10) {
          // Prevent the page from scrolling
          event.preventDefault();
        }
      }
      
      function handleTouchEnd(event) {
        if (!isDragging) return;
        
        touchEndX = event.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        // Only register as a swipe if the movement is significant
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            showNextExperienceCard();
          } else {
            showPrevExperienceCard();
          }
        }
        
        isDragging = false;
      }
      
      // Make arrow buttons work properly
      if (experienceLeftArrow) {
        const handleLeftArrowClick = function(event) {
          event.preventDefault();
          event.stopPropagation();
          showPrevExperienceCard();
        };
        
        // Remove any existing listeners
        const newLeftArrow = experienceLeftArrow.cloneNode(true);
        experienceLeftArrow.parentNode.replaceChild(newLeftArrow, experienceLeftArrow);
        
        // Add new listeners
        const freshLeftArrow = document.getElementById('experience-left-arrow');
        freshLeftArrow.addEventListener('click', handleLeftArrowClick);
        freshLeftArrow.addEventListener('touchstart', handleLeftArrowClick, { passive: false });
      }
      
      if (experienceRightArrow) {
        const handleRightArrowClick = function(event) {
          event.preventDefault();
          event.stopPropagation();
          showNextExperienceCard();
        };
        
        // Remove any existing listeners
        const newRightArrow = experienceRightArrow.cloneNode(true);
        experienceRightArrow.parentNode.replaceChild(newRightArrow, experienceRightArrow);
        
        // Add new listeners
        const freshRightArrow = document.getElementById('experience-right-arrow');
        freshRightArrow.addEventListener('click', handleRightArrowClick);
        freshRightArrow.addEventListener('touchstart', handleRightArrowClick, { passive: false });
      }
      
      // Add pagination dot listeners
      experienceDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          experienceCurrentIndex = index;
          updateExperienceCarousel();
        });
      });
      
      // Add event listeners for mouse wheel
      window.addEventListener('wheel', handleWheel, { passive: false });
      
      // Add event listeners for touch interaction
      carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Initialize carousel position
      updateExperienceCarousel();
    })();
  
    /* ==========================
       TYPING EFFECT
       ========================== */
    (function initTypingEffect() {
      const roles = ['Full Stack Developer', 'UI/UX Designer'];
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
   SKILLS INFINITE SCROLL - PERFECTLY SEAMLESS LOOPING
   ========================== */
(function initSkillsScroll() {
  const skillsTrack = document.querySelector('.skills-track');
  if (!skillsTrack) return;

  // Store and remove any existing CSS animation
  const originalAnimation = window.getComputedStyle(skillsTrack).getPropertyValue('animation');
  skillsTrack.style.animation = 'none';
  
  // Force browser to acknowledge style change before continuing
  void skillsTrack.offsetWidth;
  
  // Get the initial content before cloning
  const initialContent = skillsTrack.innerHTML;
  
  // First, measure the width of a single item to determine optimal cloning
  const firstItem = skillsTrack.querySelector('.skill-card');
  if (!firstItem) return;
  
  const itemWidth = firstItem.offsetWidth + 
                    parseInt(window.getComputedStyle(firstItem).marginRight);
  
  // Get all items and measure total original width
  const allItems = skillsTrack.querySelectorAll('.skill-card');
  const totalOriginalWidth = Array.from(allItems).reduce((width, item) => {
    const itemStyle = window.getComputedStyle(item);
    return width + item.offsetWidth + parseInt(itemStyle.marginRight);
  }, 0);
  
  // Clone enough items to ensure we have at least 3x viewport width
  const viewportWidth = window.innerWidth;
  const minimumWidth = viewportWidth * 3;
  const repetitions = Math.max(3, Math.ceil(minimumWidth / totalOriginalWidth) * 2);
  
  // Duplicate content multiple times for ultimate smoothness
  let newContent = '';
  for (let i = 0; i < repetitions; i++) {
    newContent += initialContent;
  }
  skillsTrack.innerHTML = newContent;
  
  // Calculate the actual single set width after cloning
  const actualSetWidth = totalOriginalWidth;
  
  // Keep track of our position and whether a reset is pending
  let position = 0;
  let resetPending = false;
  let lastTimestamp = 0;
  const scrollSpeed = 0.55; // Pixels per frame
  
  function animateSkills(timestamp) {
    // Calculate time delta for smooth animation regardless of frame rate
    const delta = lastTimestamp ? (timestamp - lastTimestamp) : 16;
    lastTimestamp = timestamp;
    
    // Only advance position if no reset is pending
    if (!resetPending) {
      // Advance position based on time delta for consistent speed
      position += scrollSpeed * (delta / 16);
      
      // Check if we need to reset
      if (position >= actualSetWidth) {
        // Flag that we need to reset on next frame
        resetPending = true;
      }
      
      // Apply transform
      skillsTrack.style.transform = `translateX(-${position}px)`;
    } else {
      // We have a reset pending - do it invisibly
      // Calculate the exact position within the repeat pattern
      const newPosition = position % actualSetWidth;
      
      // Set position without animation
      position = newPosition;
      skillsTrack.style.transform = `translateX(-${position}px)`;
      
      // Reset complete
      resetPending = false;
    }
    
    // Continue animation
    requestAnimationFrame(animateSkills);
  }
  
  // Start animation
  requestAnimationFrame(animateSkills);
})();
  });