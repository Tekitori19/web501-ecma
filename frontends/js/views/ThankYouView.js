export function renderThankYou() {
    const thankYouContainer = document.getElementById('thank-you');
    thankYouContainer.innerHTML = `
        <div class="thank-you-message">
            <h2>Thank You for Your Order!</h2>
            <p>Your order has been successfully placed.</p>
            <p>You will receive a confirmation email shortly.</p>
            <button onclick="window.location.href='/'">Continue Shopping</button>
        </div>
    `;
}