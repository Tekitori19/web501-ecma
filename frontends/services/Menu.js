import API from "./API.js";

export async function loadData() {
    app.store.menu = await API.fetchMenu();
}

export async function loadDataByCate(id) {
    app.store.menu = await API.fetchProductByCategory(id);
}

export async function loadDataByPrice(min = 0, max = 1000000) {
    app.store.menu = await API.fetchProductByPrice(min, max);
}

export async function getProductById(id) {
    if (app.store.menu == null) {
        app.store.menu = [];
    }
    for (let product of app.store.menu) {
        if (product.id == id) {
            return product;
        }
    }
    const product = await API.fetchProductById(id);
    if (product) {
        app.store.menu.push(product);
        return product;
    }
    return null;
}

export async function categoryChange(id) {
    app.store.menu = await API.fetchProductByCategory(id);
}
