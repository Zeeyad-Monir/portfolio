// ===== Navigation Menu Toggle (Desktop) =====
(function initDesktopNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded',
            hamburger.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');

            const href = link.getAttribute('href');
            // Only smooth-scroll for same-page anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For cross-page links (e.g. index.html#home), let browser navigate normally
        });
    });
})();

// ===== Mobile Sticky Nav Bar =====
(function initMobileNavBar() {
    const heroSection = document.querySelector('.hero');
    const mobileNavBar = document.getElementById('mobileNavBar');
    const mobileHamburger = document.getElementById('mobileHamburgerBtn');

    if (!mobileNavBar || !mobileHamburger) return;

    function closeMobileMenu() {
        mobileHamburger.classList.remove('active');
        mobileNavBar.classList.remove('expanded');
        mobileHamburger.setAttribute('aria-expanded', 'false');
    }

    if (heroSection) {
        // Landing page: show mobile nav when scrolled past hero
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    mobileNavBar.classList.add('visible');
                } else {
                    mobileNavBar.classList.remove('visible');
                    closeMobileMenu();
                }
            });
        }, { threshold: 0, rootMargin: '-50px 0px 0px 0px' });

        heroObserver.observe(heroSection);
    } else {
        // Project pages (no .hero): show mobile nav immediately
        mobileNavBar.classList.add('visible');
    }

    // Hamburger toggle
    mobileHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileHamburger.classList.contains('active');

        mobileHamburger.classList.toggle('active');
        mobileNavBar.classList.toggle('expanded');
        mobileHamburger.setAttribute('aria-expanded', String(!isExpanded));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-nav-bar')) {
            closeMobileMenu();
        }
    });

    // Handle mobile link clicks
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();

            const href = link.getAttribute('href');
            // Only smooth-scroll for same-page anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For cross-page links, let browser navigate normally
        });
    });
})();
