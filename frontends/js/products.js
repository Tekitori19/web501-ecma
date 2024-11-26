import { addToCart, updateCartCount } from './cart.js';

export async function loadProducts(filters = {}) {
    try {
        let url = 'http://localhost:3000/products';
        if (filters.categoryId) {
            url += `?cate_id=${filters.categoryId}`;
        }
        const response = await fetch(url);
        const products = await response.json();
        
        displayProducts(products.filter(product => {
            if (filters.minPrice && product.price < filters.minPrice) return false;
            if (filters.maxPrice && product.price > filters.maxPrice) return false;
            return true;
        }));
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.detail}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productCard.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product);
            updateCartCount();
        });

        container.appendChild(productCard);
    });
}

export async function setupFilters() {
    try {
        const response = await fetch('http://localhost:3000/categories');
        const categories = await response.json();
        const select = document.getElementById('category-filter');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });

        document.getElementById('apply-filters').addEventListener('click', () => {
            const categoryId = select.value;
            const minPrice = document.getElementById('min-price').value;
            const maxPrice = document.getElementById('max-price').value;

            loadProducts({
                categoryId: categoryId || null,
                minPrice: minPrice ? parseFloat(minPrice) : null,
                maxPrice: maxPrice ? parseFloat(maxPrice) : null
            });
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}