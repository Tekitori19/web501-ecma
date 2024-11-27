import { removeFromCart } from "../services/Order.js";

export default class CartItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const item = JSON.parse(this.dataset.item);
        this.innerHTML = ""; // Clear the element

        const template = document.getElementById("cart-item-template");
        const content = template.content.cloneNode(true);

        this.appendChild(content);

        const qtyInput = this.querySelector(".qty");

        qtyInput.value = `${item.quantity}`;
        // qtyInput.addEventListener("change", event => {
        //     const newQty = parseInt(event.target.value);
        //     item.quantity = newQty;
        //     localStorage.setItem("cart", JSON.stringify(cart));
        //     document.dispatchEvent(new CustomEvent("cartUpdated"));
        // })

        this.querySelector(".name").textContent = item.product.name;
        this.querySelector(".price").textContent = `$${item.product.price.toFixed(2)}`;
        this.querySelector("a.delete-button").addEventListener("click", event => {
            event.preventDefault();
            removeFromCart(item.product.id);
        })
    }
}

customElements.define("cart-item", CartItem);
