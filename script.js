document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navWrapper = document.querySelector('.nav-wrapper');
    const navbar = document.querySelector('.navbar');

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
            const isActive = item.classList.contains('active');
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

    // --- Products Data & Logic ---
    const products = [
        {
            id: 1,
            name: "Apple iPhone 15 (128GB) - Pink",
            category: "mobiles",
            image: "https://images.pexels.com/photos/18525574/pexels-photo-18525574.jpeg?auto=compress&cs=tinysrgb&w=800",
            badge: "Top Seller",
            prices: [
                { store: "Amazon", price: 65999, isBest: false },
                { store: "Flipkart", price: 64999, isBest: true }
            ]
        },
        {
            id: 2,
            name: "Premium Wireless Headphones",
            category: "audio",
            image: "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=800",
            badge: "Hot Deal",
            prices: [
                { store: "Amazon", price: 4490, isBest: false },
                { store: "Flipkart", price: 3990, isBest: true }
            ]
        },
        {
            id: 3,
            name: "MacBook Air M3 Chip",
            category: "laptops",
            image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800",
            badge: "Premium Choice",
            prices: [
                { store: "Amazon", price: 104900, isBest: true },
                { store: "Reliance", price: 106900, isBest: false }
            ]
        },
        {
            id: 4,
            name: "Smart Watch - Sport Edition",
            category: "accessories",
            image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
            badge: "Trending",
            prices: [
                { store: "Amazon", price: 2999, isBest: true },
                { store: "Flipkart", price: 3499, isBest: false }
            ]
        },
        {
            id: 5,
            name: "Mechanical Gaming Keyboard",
            category: "accessories",
            image: "https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=800",
            badge: "Best for Gaming",
            prices: [
                { store: "Amazon", price: 1499, isBest: true },
                { store: "Flipkart", price: 1699, isBest: false }
            ]
        },
        {
            id: 6,
            name: "Samsung 5G Smartphone",
            category: "mobiles",
            image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800",
            badge: "Budget King",
            prices: [
                { store: "Amazon", price: 14499, isBest: false },
                { store: "Flipkart", price: 13999, isBest: true }
            ]
        }
    ];

    const productsGrid = document.getElementById('products-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    function renderProducts(filteredProducts) {
        if (!productsGrid) return;

        productsGrid.innerHTML = '';

        filteredProducts.forEach(product => {
            const bestPrice = Math.min(...product.prices.map(p => p.price));

            const card = document.createElement('div');
            card.className = 'product-card animate-fade-in';
            card.innerHTML = `
                <span class="product-badge">${product.badge}</span>
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/400x400?text=Product+Image'">
                </div>
                <h3 class="product-title">${product.name}</h3>
                <div class="price-comparison-grid">
                    ${product.prices.map(p => `
                        <div class="store-row ${p.price === bestPrice ? 'best-price' : ''}">
                            <div class="store-info">
                                <span class="store-name">${p.store}</span>
                            </div>
                            <div class="product-price">
                                ₹${p.price.toLocaleString()}
                                ${p.price === bestPrice ? '<span class="best-price-indicator">Best</span>' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    function filterAndSortProducts() {
        if (!categoryFilter || !sortFilter) return;
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;

        let filtered = [...products];

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (sortBy === 'price-low') {
            filtered.sort((a, b) => {
                const minA = Math.min(...a.prices.map(p => p.price));
                const minB = Math.min(...b.prices.map(p => p.price));
                return minA - minB;
            });
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => {
                const minA = Math.min(...a.prices.map(p => p.price));
                const minB = Math.min(...b.prices.map(p => p.price));
                return minB - minA;
            });
        }

        renderProducts(filtered);
    }

    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterAndSortProducts);

    // Initial render
    renderProducts(products);

    // Common Button Handlers
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Login modal is disabled in this static demo.');
        });
    });
});
