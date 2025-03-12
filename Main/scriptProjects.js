/* Scroll to Top Button Functionality */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollTopBtn.style.display = "block";
  } else {
      scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* Lightbox Functionality */
const projectImages = document.querySelectorAll('.project-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

projectImages.forEach(img => {
  img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
      lightbox.style.display = 'none';
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      lightbox.style.display = 'none';
  }
});

const animations = [
  { path: 'Json/flowerFalling2.json', speed: 2.0 },
];

let currentAnimationIndex = 0;
let currentAnimation = null;
const baseAnimationDuration = 15000; // Base duration in ms (10 seconds)
const lottieContainer = document.getElementById('lottie-container');

function loadNextAnimation() {
  // Destroy previous animation if it exists
  if (currentAnimation) {
    currentAnimation.destroy();
  }
  
  const animationData = animations[currentAnimationIndex];
  console.log(`Loading animation: ${animationData.path} with speed factor ${animationData.speed}`);
  
  // Load the next Lottie animation without autoplay or looping.
  // Note the rendererSettings property for "cover" behavior:
  currentAnimation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: animationData.path,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'  // Ensures the animation covers the container
    }
  });
  
  // When the animation data is fully loaded...
  currentAnimation.addEventListener('DOMLoaded', () => {
    const totalFrames = currentAnimation.totalFrames;
    const startTime = performance.now();
    
    function updateFrame() {
      const elapsed = performance.now() - startTime;
      // Multiply elapsed time by the custom speed factor
      const adjustedElapsed = elapsed * animationData.speed;
      const progress = adjustedElapsed / baseAnimationDuration;
      
      if (progress < 1) {
        const frame = progress * totalFrames;
        currentAnimation.goToAndStop(frame, true);
        requestAnimationFrame(updateFrame);
      } else {
        // End the animation at its last frame
        currentAnimation.goToAndStop(totalFrames, true);
        // Move on to the next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        loadNextAnimation();
      }
    }
    
    updateFrame();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadNextAnimation();

  // Scroll arrows functionality for horizontal gallery
  const scrollGallery = document.querySelector('.scroll-gallery');
  const leftArrow = document.querySelector('.scroll-arrows .arrow.left');
  const rightArrow = document.querySelector('.scroll-arrows .arrow.right');
    
  if (leftArrow && rightArrow && scrollGallery) {
    leftArrow.addEventListener('click', () => {
      scrollGallery.scrollBy({ left: -300, behavior: 'smooth' });
    });
        
    rightArrow.addEventListener('click', () => {
      scrollGallery.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
});

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

// Run initialization on page load
document.addEventListener('DOMContentLoaded', function() {
  // Also run mobile navigation initialization
  initMobileNavigation();
  
  // Run it again after a short delay to ensure everything is loaded
  setTimeout(initMobileNavigation, 500);
  
  // Additional timer for iOS devices which sometimes need more time
  setTimeout(initMobileNavigation, 1500);
});