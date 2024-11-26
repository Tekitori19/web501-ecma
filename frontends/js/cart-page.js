import { updateCartCount } from './cart.js';

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalContainer.innerHTML = '';
        checkoutBtn.classList.add('hidden');
        return;
    }

    let total = 0;
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}">
            <div class="item-details">
                <h3>${item.product.name}</h3>
                <p class="item-price">$${item.product.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="window.updateQuantity(${item.product.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="window.updateQuantity(${item.product.id}, ${item.quantity + 1})">+</button>
                </div>
                <button onclick="window.removeFromCart(${item.product.id})" class="remove-btn">Remove</button>
            </div>
            <div class="item-total">$${itemTotal.toFixed(2)}</div>
        `;
        cartContainer.appendChild(cartItem);
    });

    totalContainer.innerHTML = `
        <div class="cart-total">
            <h3>Total: $${total.toFixed(2)}</h3>
        </div>
    `;
    
    checkoutBtn.classList.remove('hidden');
    checkoutBtn.onclick = () => window.location.href = '/checkout.html';
}

// Make functions available globally for the onclick handlers
window.updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.product.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
};

window.removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
};

// Initialize cart page
displayCart();
updateCartCount();