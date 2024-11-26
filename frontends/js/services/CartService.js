export class CartService {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ product, quantity: 1 });
        }
        
        this._saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this._saveCart();
            }
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.product.id !== productId);
        this._saveCart();
    }

    getCartItems() {
        return this.cart;
    }

    clearCart() {
        this.cart = [];
        this._saveCart();
    }

    _saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}