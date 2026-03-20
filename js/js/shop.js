// Shop page specific functionality
let currentProducts = [];
let filteredProducts = [];

// Load products on shop page
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('productsCount');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!productsGrid) return;
    
    loadingIndicator.style.display = 'block';
    
    try {
        // Sample products data
        const products = [
            { id: 1, name: 'Classic Denim Jacket', price: 89.99, category: 'men', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Denim+Jacket', date: '2024-01-15' },
            { id: 2, name: 'Silk Blouse', price: 79.99, category: 'women', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Silk+Blouse', date: '2024-01-20' },
            { id: 3, name: 'Wool Coat', price: 199.99, category: 'women', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Wool+Coat', date: '2024-01-10' },
            { id: 4, name: 'Leather Boots', price: 149.99, category: 'men', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Leather+Boots', date: '2024-01-05' },
            { id: 5, name: 'Cashmere Sweater', price: 129.99, category: 'men', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Cashmere+Sweater', date: '2024-01-25' },
            { id: 6, name: 'Pleated Skirt', price: 69.99, category: 'women', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Pleated+Skirt', date: '2024-01-18' },
            { id: 7, name: 'Leather Jacket', price: 249.99, category: 'men', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Leather+Jacket', date: '2024-01-12' },
            { id: 8, name: 'Maxi Dress', price: 89.99, category: 'women', image: 'https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Maxi+Dress', date: '2024-01-22' }
        ];
        
        currentProducts = products;
        filteredProducts = [...products];
        
        renderProducts();
        
        if (productsCount) {
            productsCount.textContent = `Showing ${filteredProducts.length} products`;
        }
        
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p>Unable to load products. Please try again later.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Render products based on current filters
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found. Try adjusting your filters.</p>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="btn-add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Apply filters
function applyFilters() {
    let filtered = [...currentProducts];
    
    // Gender filter
    const genderRadio = document.querySelector('input[name="gender"]:checked');
    if (genderRadio && genderRadio.value !== 'all') {
        filtered = filtered.filter(p => p.category === genderRadio.value);
    }
    
    // Price filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const maxPrice = parseInt(priceRange.value);
        filtered = filtered.filter(p => p.price <= maxPrice);
    }
    
    // Sort
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        switch(sortBy.value) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }
    }
    
    filteredProducts = filtered;
    renderProducts();
    
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        productsCount.textContent = `Showing ${filteredProducts.length} products`;
    }
}

// Clear all filters
function clearFilters() {
    // Reset gender radio
    const allRadio = document.querySelector('input[name="gender"][value="all"]');
    if (allRadio) allRadio.checked = true;
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 500;
        const priceValue = document.getElementById('priceValue');
        if (priceValue) priceValue.textContent = '$500';
    }
    
    // Reset sort
    const sortBy = document.getElementById('sortBy');
    if (sortBy) sortBy.value = 'newest';
    
    // Reapply filters
    applyFilters();
}

// Event listeners for filters
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Price range display
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            priceValue.textContent = `$${e.target.value}`;
            applyFilters();
        });
    }
    
    // Gender filters
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
    
    // Sort filter
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', applyFilters);
    }
    
    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
    
    // Check URL for gender parameter
    const urlParams = new URLSearchParams(window.location.search);
    const genderParam = urlParams.get('gender');
    if (genderParam && (genderParam === 'men' || genderParam === 'women')) {
        const radio = document.querySelector(`input[name="gender"][value="${genderParam}"]`);
        if (radio) radio.checked = true;
        applyFilters();
    }
});