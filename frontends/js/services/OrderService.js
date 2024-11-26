export class OrderService {
    async createOrder(orderData, cartItems) {
        // Create order
        const orderResponse = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const order = await orderResponse.json();

        // Create order details
        const orderDetails = cartItems.map(item => ({
            order_id: order.id,
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price
        }));

        // Save order details
        await Promise.all(orderDetails.map(detail =>
            fetch('http://localhost:3000/order_details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detail)
            })
        ));

        return order;
    }
}
