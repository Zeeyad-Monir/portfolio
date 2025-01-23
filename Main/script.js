// =====================
// Cursor Tracking Effect
// =====================
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// =====================
// Experience Projects Carousel Functionality
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const experienceCarousel = document.querySelector('.carousel'); // Assuming '.carousel' is for experience projects

    if (experienceCarousel) {
        const experienceCards = experienceCarousel.querySelectorAll('.experience-card');
        const experienceDots = document.querySelectorAll('.pagination-dots button');
        let experienceCurrentIndex = 0;

        // Select the arrow buttons
        const experienceLeftArrow = document.getElementById('experience-left-arrow');
        const experienceRightArrow = document.getElementById('experience-right-arrow');

        // Function to Update Carousel for Experience Projects
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

            // Update active dot
            experienceDots.forEach(dot => dot.classList.remove('active'));
            if (experienceDots[experienceCurrentIndex]) {
                experienceDots[experienceCurrentIndex].classList.add('active');
            }
        }

        // Function to Show Next Experience Card
        function showNextExperienceCard() {
            experienceCurrentIndex = (experienceCurrentIndex + 1) % experienceCards.length;
            updateExperienceCarousel();
        }

        // Function to Show Previous Experience Card
        function showPrevExperienceCard() {
            experienceCurrentIndex = (experienceCurrentIndex - 1 + experienceCards.length) % experienceCards.length;
            updateExperienceCarousel();
        }

        // Attach Click Events to Experience Dots
        experienceDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                experienceCurrentIndex = index;
                updateExperienceCarousel();
            });
        });

        // =====================
        // Arrow Button Functionality for Experience Carousel
        // =====================

        // Check if arrow buttons exist to prevent errors
        if (experienceLeftArrow && experienceRightArrow) {
            // Attach Click Events to Arrow Buttons
            experienceLeftArrow.addEventListener('click', showPrevExperienceCard);
            experienceRightArrow.addEventListener('click', showNextExperienceCard);
        }

        // Initialize the Experience Carousel on Page Load
        updateExperienceCarousel();
    }
});

// =====================
// Design Projects Carousel Functionality
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const designCarousel = document.querySelector('.design-carousel');

    if (designCarousel) {
        const designCards = designCarousel.querySelectorAll('.design-experience-card');
        const designDots = document.querySelectorAll('.design-pagination-dots button');
        let designCurrentIndex = 0;

        // Select the arrow buttons
        const designLeftArrow = document.getElementById('design-left-arrow');
        const designRightArrow = document.getElementById('design-right-arrow');

        // Function to Update Carousel for Design Projects
        function updateDesignCarousel() {
            designCards.forEach((card, index) => {
                card.classList.remove('prev2', 'prev', 'active', 'next', 'next2');

                if (index === designCurrentIndex) {
                    card.classList.add('active');
                } else if (index === (designCurrentIndex - 1 + designCards.length) % designCards.length) {
                    card.classList.add('prev');
                } else if (index === (designCurrentIndex - 2 + designCards.length) % designCards.length) {
                    card.classList.add('prev2');
                } else if (index === (designCurrentIndex + 1) % designCards.length) {
                    card.classList.add('next');
                } else if (index === (designCurrentIndex + 2) % designCards.length) {
                    card.classList.add('next2');
                }
            });

            // Update active dot
            designDots.forEach(dot => dot.classList.remove('active'));
            if (designDots[designCurrentIndex]) {
                designDots[designCurrentIndex].classList.add('active');
            }
        }

        // Function to Show Next Design Card
        function showNextDesignCard() {
            designCurrentIndex = (designCurrentIndex + 1) % designCards.length;
            updateDesignCarousel();
        }

        // Function to Show Previous Design Card
        function showPrevDesignCard() {
            designCurrentIndex = (designCurrentIndex - 1 + designCards.length) % designCards.length;
            updateDesignCarousel();
        }

        // Attach Click Events to Design Dots
        designDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                designCurrentIndex = index;
                updateDesignCarousel();
            });
        });

        // =====================
        // Arrow Button Functionality for Design Carousel
        // =====================

        // Check if arrow buttons exist to prevent errors
        if (designLeftArrow && designRightArrow) {
            // Attach Click Events to Arrow Buttons
            designLeftArrow.addEventListener('click', showPrevDesignCard);
            designRightArrow.addEventListener('click', showNextDesignCard);
        }

        // Initialize the Design Carousel on Page Load
        updateDesignCarousel();
    }
});

// =====================
// Home Section Typing Effect
// =====================
const roles = ['Front End Developer', 'UI/UX Designer'];
let roleIndex = 0;
let charIndex = 0;
let currentRole = '';
let isDeleting = false;

function typeRole() {
    const target = document.getElementById('role-animation');

    if (!isDeleting && charIndex <= roles[roleIndex].length) {
        currentRole = roles[roleIndex].substring(0, charIndex++);
        target.innerHTML = currentRole;
        setTimeout(typeRole, 100); // Typing speed
    } else if (isDeleting && charIndex > 0) {
        currentRole = roles[roleIndex].substring(0, charIndex--);
        target.innerHTML = currentRole;
        setTimeout(typeRole, 60); // Deleting speed
    } else if (!isDeleting && charIndex > roles[roleIndex].length) {
        isDeleting = true;
        setTimeout(typeRole, 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500); // Pause before typing next role
    }
}

document.addEventListener('DOMContentLoaded', () => typeRole());

/* 
Optional Features:
If you wish to use the Scroll to Top button or the Lightbox functionality, ensure you add the corresponding HTML elements and uncomment the following code.
*/

// // =====================
// // Scroll to Top Button Functionality
// // =====================
// const scrollTopBtn = document.getElementById("scrollTopBtn");

// window.onscroll = function() {
//     if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
//         scrollTopBtn.style.display = "block";
//     } else {
//         scrollTopBtn.style.display = "none";
//     }
// };

// scrollTopBtn.onclick = function() {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// };

// // =====================
// // Project 1 gallery showcase
// // =====================

//     // Lightbox functionality
//     const projectImages = document.querySelectorAll('.project-image img');
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImg = lightbox.querySelector('img');

//     projectImages.forEach(img => {
//         img.addEventListener('click', () => {
//             lightbox.style.display = 'flex';
//             lightboxImg.src = img.src;
//             lightboxImg.alt = img.alt;
//         });
//     });

//     lightbox.addEventListener('click', (e) => {
//         if (e.target !== lightboxImg) {
//             lightbox.style.display = 'none';
//         }
//     });

// =====================
// Starfield Animation
// =====================
function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h;

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = document.getElementById('home').offsetHeight;
    }
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    function createStars() {
        stars = [];
        for (let i = 0; i < 150; i++) { // Increased number of stars for density
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 1.8, // Increased size
                vx: (Math.random() - 0.5) * 0.2, // Slower movement for subtlety
                vy: (Math.random() - 0.5) * 0.2
            });
        }
    }
    createStars();

    function animate() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < stars.length; i++) {
            let s = stars[i];
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fill();

            s.x += s.vx;
            s.y += s.vy;

            // Wrap around edges
            if (s.x < 0) s.x = w;
            if (s.x > w) s.x = 0;
            if (s.y < 0) s.y = h;
            if (s.y > h) s.y = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
});