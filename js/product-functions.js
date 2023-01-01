fetch("../../js/products.json")
    .then(response => response.json())
    .then(products => {
        localStorage.setItem("products", JSON.stringify(products));
    });

let container = document.querySelector(".product-cards");

let initialItems = Math.floor(container.offsetWidth / 253);

function loadFromCategory(category) {
    let products = JSON.parse(localStorage.getItem("products"));
    let out = "";
    let counter = 0;
    for (let product of products) {
        if (counter < initialItems && product.category === category) {
            out = `
            <div class="image-wrapper">
                <a href="product-details.html?id=${product.id}">
                    <img class="product-image" src="../../images/${product.filename}" alt="${product.name} Picture">
                    <div class="image-overlay">
                        <button><a href="#">ADD TO CART <img src="../../images/cart-icon.png" alt="cart-icon"></a></button>
                        <nav>
                            <ul class="product-navbar">
                                <li><a href="#"><img src="../../images/heart-icon.png" alt="heart"></a></li>
                                <li><a href="#"><img src="../../images/eye-icon.png" alt="eye"></a></li>
                                <li><a href="#"><img src="../../images/arrow-icon.png" alt="arrow"></a></li>
                            </ul>
                        </nav>
                    </div>
                </a>
            </div>
            <p class="product-description"><a href="product-details.html?id=${product.id}">${product.name}</a></p>
        `;
            if (product.discounted) {
                let discountedPrice = calculateDiscount(product);
                out += `
            <p class="price">&dollar;` + discountedPrice.toFixed(2) + ` <span>&dollar;${product.price}</span></p>
            `;
            }
            else {
                out += `
            <p class="price">&dollar;${product.price}</p>
            `;
            }
            let div = document.createElement("div");
            div.className = 'product';
            container.append(div);
            div.innerHTML = out;
            counter++;
        }

    }
}

function calculateDiscount(product) {
    return 0.5 * product.price;
}