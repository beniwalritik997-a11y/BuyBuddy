let allProducts = [];

var productContainer = document.getElementById('product-container');


async function fetchProducts() {

    productContainer.innerHTML = '<p class="loading-msg">⏳ Loading products...</p>';

    try {

        var response = await fetch("https://dummyjson.com/products?limit=100");

        if (!response.ok) {
            throw new Error("Could not load products. Please try again.");
        }

        var data = await response.json();

        allProducts = data.products;

        renderProducts(allProducts);

    } catch (error) {
        productContainer.innerHTML = '<p class="loading-msg">❌ ' + error.message + '</p>';
    }
}

function renderProducts(productsList) {

    productContainer.innerHTML = '';

    if (productsList.length === 0) {
        productContainer.innerHTML = '<p class="loading-msg">😕 No products found.</p>';
        return;
    }

    productsList.forEach(function(product) {

        var card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML =
            '<img src="' + product.thumbnail + '" alt="' + product.title + '">' +
            '<h3>' + product.title + '</h3>' +
            '<p class="category">' + product.category + '</p>' +
            '<p class="price">$' + product.price + '</p>';

        productContainer.appendChild(card);
    });
}

fetchProducts();