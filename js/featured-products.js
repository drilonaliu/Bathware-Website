fetch("js/products.json")
    .then(response => response.json())
    .then(products => {
        localStorage.setItem("products", JSON.stringify(products));
    });

let container = document.querySelector(".product-cards");
let loadMoreButton = document.querySelector(".load-more-button button");

let initialItems = Math.floor(container.offsetWidth / 253) * 2;
let loadItems = initialItems;

function loadInitialItems() {
    let products = JSON.parse(localStorage.getItem("products"));
    let out = "";
    let counter = 0;
    for (let product of products) {
        if (counter < initialItems) {
            out = `
                <div class="image-wrapper">
                    <a href="product-details.html?id=${product.id}">
                        <img class="product-image" src="images/${product.filename}" alt="${product.name} Picture">
                        <div class="image-overlay">
                            <button><a href="#">ADD TO CART <img src="images/cart-icon.png" alt="cart-icon"></a></button>
                            <nav>
                                <ul class="product-navbar">
                                    <li><a href="#"><img src="images/heart-icon.png" alt="heart"></a></li>
                                    <li><a href="#"><img src="images/eye-icon.png" alt="eye"></a></li>
                                    <li><a href="#"><img src="images/arrow-icon.png" alt="arrow"></a></li>
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
        }

        counter++;
    }
}

function calculateDiscount(product) {
    return 0.5 * product.price;
}

function loadMore() {
    let products = JSON.parse(localStorage.getItem("products"));
    let currentDisplayedProducts = document.querySelectorAll(".product").length;

    let out = "";
    let counter = 0;
    for (let product of products) {
        if (counter >= currentDisplayedProducts && counter < loadItems + currentDisplayedProducts) {
            out = `
                <div class="image-wrapper">
                <a href="product-details.html?id=${product.id}">
                    <img class="product-image" src="images/${product.filename}" alt="${product.name} Picture">
                    <div class="image-overlay">
                        <button><a href="#">ADD TO CART <img src="images/cart-icon.png" alt="cart-icon"></a></button>
                        <nav>
                            <ul class="product-navbar">
                                <li><a href="#"><img src="images/heart-icon.png" alt="heart"></a></li>
                                <li><a href="#"><img src="images/eye-icon.png" alt="eye"></a></li>
                                <li><a href="#"><img src="images/arrow-icon.png" alt="arrow"></a></li>
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
            div.style.opacity = 0;
            fadeIn(div);
        }
        counter++;
    }

    if (document.querySelectorAll(".product").length == products.length) {
        loadMoreButton.style.display = "none";
    }

}

function fadeIn(div) {
    let opacity = 0;
    let interval = setInterval(function () {
        if (opacity <= 1) {
            opacity = opacity + 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 30);
}


//forces user to scroll to top of the page on every refresh
//probably need to move it somewhere else
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}