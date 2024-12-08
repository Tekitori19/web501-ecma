import Store from '/static/services/Store.js'
import API from '/static/services/API.js'
import { loadData } from '/static/services/Menu.js';
import Router from '/static/services/Router.js';

// Link my Web Components
import { MenuPage } from '/static/components/MenuPage.js';
import { DetailsPage } from '/static/components/DetailsPage.js';
import { OrderPage } from '/static/components/OrderPage.js';
import ProductItem from '/static/components/ProductItem.js';
import CartItem from '/static/components/CartItem.js';

window.app = {}
app.store = Store;
app.router = Router;



// It's better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async () => {
    // loadData();
    app.router.init();
});

window.addEventListener("appcartchange", event => {
    const badge = document.getElementById("badge");
    const qty = app.store.cart.reduce(
        (acc, item) => acc + item.quantity, 0
    );
    badge.textContent = qty;
    badge.hidden = qty == 0;
})






