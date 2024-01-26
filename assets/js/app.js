document.addEventListener('DOMContentLoaded', (event) => {
    // Апишка
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            let products = data; // Сейв
            let filteredProducts = [...products]; // Фильтр

            // Вывод
            function displayProducts(products) {
                let productContainer = document.getElementById('productContainer');
                productContainer.innerHTML = '';

                products.forEach(product => {
                    productContainer.innerHTML += `
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="card shadow h-100">
                                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.title}</h5>
                                    <p class="card-text">${product.description}</p>
                                    <p class="card-text"><small class="text-muted">$ ${product.price}</small></p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            // Возрастание
            function sortByPriceAsc() {
                filteredProducts.sort((a, b) => a.price - b.price);
                displayProducts(filteredProducts);
            }

            // Убывание
            function sortByPriceDesc() {
                filteredProducts.sort((a, b) => b.price - a.price);
                displayProducts(filteredProducts);
            }

            // Поиск
            function searchProducts(query) {
                filteredProducts = products.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase())
                );
                displayProducts(filteredProducts);
            }

            document.getElementById('sortButtonAsc').addEventListener('click', sortByPriceAsc);
            document.getElementById('sortButtonDesc').addEventListener('click', sortByPriceDesc);

            document.getElementById('searchInput').addEventListener('input', (e) => searchProducts(e.target.value));

            displayProducts(products);
        })
        .catch(error => console.error(error));
});
