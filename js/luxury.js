// Custom Cursor
if (window.innerWidth >= 1024) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    
    const interactiveElements = document.querySelectorAll('a, button, .collection-card, .product-card-luxury');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// Navigation Scroll Effect
const nav = document.querySelector('.nav-premium');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-luxury');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.philosophy, .collections, .craftsmanship, .process, .featured, .testimonials, .atelier').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    observer.observe(section);
});

// Cart Management
let cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to your collection', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#d4af37' : '#0a0a0a'};
        color: ${type === 'success' ? '#0a0a0a' : '#ffffff'};
        border: 1px solid rgba(212, 175, 55, 0.3);
        z-index: 10000;
        font-size: 0.9rem;
        letter-spacing: 1px;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Load Featured Products
async function loadFeaturedProducts() {
    const grid = document.getElementById('featuredProducts');
    if (!grid) return;
    
    const products = [
        { id: 1, name: 'The Signature Blazer', price: 1890, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', category: 'unisex' },
        { id: 2, name: 'Sculptural Dress', price: 2450, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600', category: 'women' },
        { id: 3, name: 'Artisan Overcoat', price: 3290, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600', category: 'men' }
    ];
    
    grid.innerHTML = products.map(product => `
        <div class="product-card-luxury">
            <img src="${product.image}" alt="${product.name}" class="product-image-luxury">
            <div class="product-info-luxury">
                <h3 class="product-name-luxury">${product.name}</h3>
                <p class="product-price-luxury">$${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" style="background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 0.5rem 1rem; cursor: pointer; width: 100%; font-family: inherit; transition: all 0.3s ease;">
                    Inquire
                </button>
            </div>
        </div>
    `).join('');
}

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            const subscribers = JSON.parse(localStorage.getItem('luxurySubscribers')) || [];
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('luxurySubscribers', JSON.stringify(subscribers));
            showNotification('Welcome to the atelier', 'success');
            newsletterForm.reset();
        }
    });
}

// Collection Cards Click
document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
        const gender = card.getAttribute('data-gender');
        window.location.href = `shop.html?gender=${gender}`;
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('luxuryCart')) || [];
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart', 'success');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
    
    // Add animation classes
    document.querySelectorAll('.step, .craft-feature, .stat').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        stepObserver.observe(el);
    });
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);