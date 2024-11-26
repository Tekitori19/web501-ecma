export function renderCheckout(cartItems, submitCallback) {
    const checkoutContainer = document.getElementById('checkout');
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    checkoutContainer.innerHTML = `
        <h2>Checkout</h2>
        <div class="order-summary">
            <h3>Order Summary</h3>
            ${cartItems.map(item => `
                <div class="order-item">
                    <span>${item.product.name} x ${item.quantity}</span>
                    <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
            <div class="order-total">
                <strong>Total: $${total.toFixed(2)}</strong>
            </div>
        </div>
        <form id="checkout-form" class="checkout-form">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" required>
            </div>
            <div class="form-group">
                <label for="address">Shipping Address</label>
                <textarea id="address" required></textarea>
            </div>
            <button type="submit">Place Order</button>
        </form>
    `;

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };
        submitCallback(formData);
    });
}