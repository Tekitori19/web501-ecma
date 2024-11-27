import API from "../services/API.js";

export class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("/components/MenuPage.css");
            const css = await request.text();
            styles.textContent = css;
        }
        loadCSS();
    }

    // when the component is attached to the DOM
    connectedCallback() {
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("appmenuchange", () => {
            this.render();
        });
        this.render();
    }

    render() {
        if (app.store.menu) {
            this.root.querySelector("#menu").innerHTML = "";
            // console.log(app.store.menu);

            // Tạo một đối tượng để nhóm các sản phẩm theo cate_id
            const categories = {};
            app.store.menu.forEach(product => {
                if (!categories[product.cate_id]) {
                    categories[product.cate_id] = {
                        name: product.cate_id === 1 ? "Electronics" : product.cate_id === 2 ? "Books" : "Clothing",
                        products: []
                    };
                }
                categories[product.cate_id].products.push(product);
            });

            //load category filter
            fetch("http://localhost:8080/api/product/cate")
                .then(response => response.json())
                .then(data => {
                    // document.querySelector("#category-filter").innerHTML = "";
                    // console.log(data);
                    this.root.querySelector("#category-filter").innerHTML = "";
                    const defaultOption = document.createElement("option");
                    defaultOption.value = 0;
                    defaultOption.textContent = "Category";
                    this.root.querySelector("#category-filter").appendChild(defaultOption);
                    data.forEach(category => {
                        const optionCategory = document.createElement("option");
                        optionCategory.value = category.id;
                        optionCategory.textContent = category.name;
                        this.root.querySelector("#category-filter").appendChild(optionCategory);
                    });
                })

            // search price
            this.root.querySelector("#apply-filters").addEventListener("click", async () => {
                const min = this.root.querySelector("#min-price").value;
                const max = this.root.querySelector("#max-price").value;
                console.log(min, max);
                app.router.go(`/price-min=${min}&max=${max}`);
            });

            // Duyệt qua các danh mục và tạo các phần tử HTML tương ứng
            for (let cate_id in categories) {
                const category = categories[cate_id];
                const liCategory = document.createElement("li");
                liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class='category'>                    
                    </ul>
                `;

                this.root.querySelector("#menu").appendChild(liCategory);
                this.root.querySelector("#category-filter").addEventListener("change", async () => {
                    const selectedCategory = this.root.querySelector("#category-filter").value;
                    app.router.go(`/cate-${selectedCategory}`);
                })

                category.products.forEach(product => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector("ul").appendChild(item);
                });
            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }
}
customElements.define("menu-page", MenuPage);
