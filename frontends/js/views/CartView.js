export function renderCart(cartItems, updateQuantityCallback, removeCallback, proceedToCheckoutCallback) {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    const cartContent = document.createElement('div');
    cartContent.className = 'cart-content';

    let total = 0;

    cartItems.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" style="width: 100px;">
            <div class="item-details">
                <h3>${item.product.name}</h3>
                <p>$${item.product.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                <button class="remove-item">Remove</button>
            </div>
            <div class="item-total">
                $${itemTotal.toFixed(2)}
            </div>
        `;

        cartItem.querySelector('.quantity-input').addEventListener('change', (e) => {
            updateQuantityCallback(item.product.id, parseInt(e.target.value));
            renderCart(JSON.parse(localStorage.getItem('cart')) || [], updateQuantityCallback, removeCallback, proceedToCheckoutCallback);
        });

        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            removeCallback(item.product.id);
            renderCart(JSON.parse(localStorage.getItem('cart')) || [], updateQuantityCallback, removeCallback, proceedToCheckoutCallback);
        });

        cartContent.appendChild(cartItem);
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `
        <h3>Total: $${total.toFixed(2)}</h3>
        <button id="checkout-button">Proceed to Checkout</button>
    `;

    cartContent.appendChild(totalElement);
    cartContainer.appendChild(cartContent);

    document.getElementById('checkout-button').addEventListener('click', proceedToCheckoutCallback);
}