document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const body = document.body;
    
    // State management
    let isMenuOpen = false;
    
    // Add index to nav items for staggered animation
    navLinksItems.forEach((link, index) => {
        link.style.setProperty('--item-index', index + 1);
    });

    // Menu Toggle Function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
        body.classList.toggle('menu-open');
        
        // Update ARIA attributes
        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);
        
        // Reset animations when opening
        if (isMenuOpen) {
            navLinksItems.forEach(link => {
                link.style.animation = 'none';
                link.offsetHeight; // Force reflow
                link.style.animation = null;
            });
        }
    }

    // Event Listeners
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMenu();
            }
        }, 250);
    });

    // Touch events for swipe to close
    let touchStartY = 0;
    let touchEndY = 0;
    const SWIPE_THRESHOLD = 50;

    navLinks.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    navLinks.addEventListener('touchmove', (e) => {
        if (isMenuOpen) {
            e.preventDefault();
        }
    }, { passive: false });

    navLinks.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        const swipeDistance = touchEndY - touchStartY;
        
        if (swipeDistance > SWIPE_THRESHOLD && isMenuOpen) {
            toggleMenu();
        }
    }, { passive: true });

    // Focus trap within menu
    function handleTabKey(e) {
        if (!isMenuOpen) return;

        const focusableElements = navLinks.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        // If shift + tab
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } 
        // If just tab
        else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    // Add keyboard trap event listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            handleTabKey(e);
        }
    });

    // Prevent scroll on mobile when menu is open
    function preventDefault(e) {
        e.preventDefault();
    }

    function disableScroll() {
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
    }

    function enableScroll() {
        document.body.removeEventListener('touchmove', preventDefault);
    }

    // Update scroll lock when menu state changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('menu-open')) {
                disableScroll();
            } else {
                enableScroll();
            }
        });
    });

    observer.observe(body, {
        attributes: true,
        attributeFilter: ['class']
    });
});