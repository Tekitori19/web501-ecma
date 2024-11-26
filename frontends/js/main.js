import { loadProducts, setupFilters } from './products.js';
import { updateCartCount } from './cart.js';

// Initialize the application
async function init() {
    await loadProducts();
    setupFilters();
    updateCartCount();
}

init();