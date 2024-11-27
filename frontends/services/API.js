const API = {
    url: "http://127.0.0.1:8080/api/product",
    fetchMenu: async () => {
        const result = await fetch(API.url);
        return await result.json();
    },
    fetchProductById: async (id) => {
        const result = await fetch(`${API.url}/${id}`);
        return await result.json();
    },
    fetchProductByCategory: async (id) => {
        const result = await fetch(`${API.url}/cate/${id}`);
        return await result.json();
    },
    fetchProductByPrice: async (min, max) => {
        const result = await fetch(`http://127.0.0.1:8080/api/price?min=${min}&max=${max}`);
        return await result.json();
    }
}

export default API;
