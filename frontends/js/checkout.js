// Display order summary
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.getElementById('order-items');
    const totalContainer = document.getElementById('order-total');
    
    let total = 0;
    itemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;

        const orderItem = document.createElement('div');
        orderItem.innerHTML = `
            <p>${item.product.name} x ${item.quantity} - $${itemTotal.toFixed(2)}</p>
        `;
        itemsContainer.appendChild(orderItem);
    });

    totalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderData = {
        customer_name: document.getElementById('name').value,
        customer_email: document.getElementById('email').value,
        customer_phone_number: document.getElementById('phone').value,
        customer_address: document.getElementById('address').value,
        created_date: new Date().toISOString(),
        status: 'pending'
    };

    try {
        // Create order
        const orderResponse = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const order = await orderResponse.json();

        // Create order details
        const orderDetails = cart.map(item => ({
            order_id: order.id,
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price
        }));

        await Promise.all(orderDetails.map(detail =>
            fetch('http://localhost:3000/order_details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(detail)
            })
        ));

        // Clear cart and redirect
        localStorage.removeItem('cart');
        window.location.href = 'thank-you.html';
    } catch (error) {
        console.error('Error creating order:', error);
        alert('There was an error processing your order. Please try again.');
    }
});

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Initialize
displayOrderSummary();
updateCartCount();