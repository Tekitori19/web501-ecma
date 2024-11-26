export function renderProducts(products, addToCartCallback) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.detail}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productElement.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCartCallback(product);
            updateCartCount();
        });

        productsContainer.appendChild(productElement);
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}