document.addEventListener('DOMContentLoaded', (event) => {
    // Апишка
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            let products = data; // Сейв

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
                products.sort((a, b) => a.price - b.price);
                displayProducts(products);
            }

            // Убывание
            function sortByPriceDesc() {
                products.sort((a, b) => b.price - a.price);
                displayProducts(products);
            }

            document.getElementById('sortButtonAsc').addEventListener('click', sortByPriceAsc);
            document.getElementById('sortButtonDesc').addEventListener('click', sortByPriceDesc);

            displayProducts(products);
        })
        .catch(error => console.error(error));
});
