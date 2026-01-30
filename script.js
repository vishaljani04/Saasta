document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navWrapper = document.querySelector('.nav-wrapper');
    const navbar = document.querySelector('.navbar');
    const logoImgs = document.querySelectorAll('.logo-img');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navWrapper.classList.add('scrolled');
        } else {
            navWrapper.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenuOverlay.classList.add('open');
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('open');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.contains('active');

            // Close all others (optional, if we want one at a time)
            faqItems.forEach(i => {
                i.classList.remove('active');
                const icon = i.querySelector('.faq-icon');
                if (icon) icon.textContent = '+';
            });

            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.textContent = '−';
            }
        });
    });

    // Search Form
    const searchForm = document.querySelector('.hero-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = searchForm.querySelector('input');
            const query = input.value.trim();
            if (query) {
                alert(`Search functionality is disabled in this static demo. You searched for: ${query}`);
            }
        });
    }

    // Login Button Mock
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Login modal is disabled (`static demo`).');
        });
    });

    // Ticker Fallback for Images
    const tickerImages = document.querySelectorAll('.seller-ticker-img');
    tickerImages.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const span = document.createElement('span');
            span.innerText = img.alt;
            span.style.fontWeight = 'bold';
            span.style.fontSize = '1.2rem';
            if (img.parentElement) img.parentElement.appendChild(span);
        });
    });
});
