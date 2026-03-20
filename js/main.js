// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!', 'success');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navMenu.classList.toggle('active');
    });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Store in localStorage for demo
            const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            
            showNotification('Subscribed successfully!', 'success');
            newsletterForm.reset();
        }
    });
}

// Custom order form
const customOrderForm = document.getElementById('customOrderForm');
if (customOrderForm) {
    customOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            garmentType: document.getElementById('garmentType')?.value,
            gender: document.getElementById('gender')?.value,
            fabric: document.getElementById('fabric')?.value,
            color: document.getElementById('color')?.value,
            budget: document.getElementById('budget')?.value,
            bust: document.getElementById('bust')?.value,
            waist: document.getElementById('waist')?.value,
            hips: document.getElementById('hips')?.value,
            description: document.getElementById('description')?.value,
            inspiration: document.getElementById('inspiration')?.value,
            timeline: document.getElementById('timeline')?.value,
            name: document.getElementById('name')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone')?.value,
            date: new Date().toISOString()
        };
        
        // Store in localStorage for demo
        const orders = JSON.parse(localStorage.getItem('customOrders')) || [];
        orders.push(formData);
        localStorage.setItem('customOrders', JSON.stringify(orders));
        
        const messageDiv = document.getElementById('formMessage');
        messageDiv.style.display = 'block';
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Thank you! We will contact you within 24 hours.';
        
        customOrderForm.reset();
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    });
}

// Load featured products on homepage
async function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featuredProducts');
    if (!productsGrid) return;
    
    try {
        // Sample products data (replace with API call)
        const products = [
            { id: 1, name: 'Classic Denim Jacket', price: 89.99, image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Denim+Jacket', category: 'men' },
            { id: 2, name: 'Silk Blouse', price: 79.99, image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Silk+Blouse', category: 'women' },
            { id: 3, name: 'Wool Coat', price: 199.99, image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Wool+Coat', category: 'women' },
            { id: 4, name: 'Leather Boots', price: 149.99, image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Leather+Boots', category: 'men' }
        ];
        
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="btn-add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p>Unable to load products. Please try again later.</p>';
    }
}

// Load workshops preview
async function loadWorkshopsPreview() {
    const workshopGrid = document.getElementById('workshopPreview');
    if (!workshopGrid) return;
    
    try {
        const workshops = [
            { id: 1, title: 'Sewing Basics', date: 'March 15, 2024', image: 'https://via.placeholder.com/400x200/1a1a1a/ffffff?text=Sewing+Basics', description: 'Learn the fundamentals of sewing' },
            { id: 2, title: 'Pattern Making', date: 'March 22, 2024', image: 'https://via.placeholder.com/400x200/1a1a1a/ffffff?text=Pattern+Making', description: 'Create your own patterns' },
            { id: 3, title: 'Advanced Embroidery', date: 'March 29, 2024', image: 'https://via.placeholder.com/400x200/1a1a1a/ffffff?text=Embroidery', description: 'Master embroidery techniques' }
        ];
        
        workshopGrid.innerHTML = workshops.map(workshop => `
            <div class="workshop-card">
                <img src="${workshop.image}" alt="${workshop.title}" class="workshop-image">
                <div class="workshop-content">
                    <h3 class="workshop-title">${workshop.title}</h3>
                    <p class="workshop-date">📅 ${workshop.date}</p>
                    <p class="workshop-description">${workshop.description}</p>
                    <button onclick="bookWorkshop(${workshop.id})" class="btn btn-primary">Book Now</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading workshops:', error);
    }
}

// Book workshop function
function bookWorkshop(workshopId) {
    showNotification('Workshop booking feature coming soon!', 'success');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
    loadWorkshopsPreview();
});

// Add CSS animation for notification
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