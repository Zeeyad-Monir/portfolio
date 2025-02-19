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
  { path: 'Json/snakeGame.json', speed: 2.0 },
];

let currentAnimationIndex = 0;
let currentAnimation = null;
const baseAnimationDuration = 20000; // Base duration in ms (10 seconds)
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
 