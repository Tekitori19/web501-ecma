// price-min=100&max=200
route = "price-min=100&max=200";
const params = new URLSearchParams(route.split('-')[1])
const min = params.get("price-min");
const max = params.get("max");
console.log(params, min, max);
