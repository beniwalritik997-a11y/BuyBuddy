let allProducts = [];

const productContainer = document.getElementById('product-container');


async function fetchProducts() {

    productContainer.innerHTML = '<p class="loading-msg">⏳ Loading products...</p>';

    try {

        const response = await fetch("https://dummyjson.com/products?limit=100");

        if (!response.ok) {
            throw new Error("Could not load products. Please try again.");
        }

        const data = await response.json();

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

        const card = document.createElement('div');
        card.className = 'product-card';


        card.innerHTML =
            '<img src="' + product.thumbnail + '" alt="' + product.title + '">' +
            '<h3>' + product.title + '</h3>' +
            '<p class="category">' + product.category + '</p>' +
            '<p class="price">$' + product.price + '</p>';

        productContainer.appendChild(card);
    });
}

function applyFilters() {

    const searchText   = document.getElementById('search-bar').value.toLowerCase();
    const category     = document.getElementById('category-filter').value;
    const sortOrder    = document.getElementById('price-sort').value;


    let result = allProducts.filter(function(product) {
        const titleMatches    = product.title.toLowerCase().includes(searchText);
        const categoryMatches = category === 'all' || product.category === category;
        return titleMatches && categoryMatches;
    });


    if (sortOrder === 'low') {
        result.sort(function(a, b) { return a.price - b.price; });
    } else if (sortOrder === 'high') {
        result.sort(function(a, b) { return b.price - a.price; });
    }


    renderProducts(result);
}

document.getElementById('search-bar').addEventListener('input', applyFilters);

document.getElementById('category-filter').addEventListener('change', applyFilters);

document.getElementById('price-sort').addEventListener('change', applyFilters);

fetchProducts();