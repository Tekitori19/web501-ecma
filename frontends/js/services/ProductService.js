export class ProductService {
    async getProducts(filters = {}) {
        let url = 'http://localhost:8080/products?';

        if (filters.cate_id) {
            url += `cate_id=${filters.cate_id}&`;
        }

        const response = await fetch(url);
        let products = await response.json();

        if (filters.minPrice) {
            products = products.filter(p => p.price >= filters.minPrice);
        }

        if (filters.maxPrice) {
            products = products.filter(p => p.price <= filters.maxPrice);
        }

        return products;
    }

    async getCategories() {
        const response = await fetch('http://localhost:3000/categories');
        return await response.json();
    }
}
