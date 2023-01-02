fetch("../../js/products.json")
    .then(response => response.json())
    .then(products => {
        localStorage.setItem("products", JSON.stringify(products));
    });

let container = document.querySelector(".product-cards");
initialItems = Math.floor(container.offsetWidth / 253);

const rangeInput = document.querySelectorAll(".range-input input");
priceInput = document.querySelectorAll(".price-input input");
progress = document.querySelector(".slider .progress");

let priceGap = 100;

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            }
            else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }

    });
});

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if ((maxVal - minVal >= priceGap) && maxVal <= 1000 && minVal >=0 ) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }
            else {
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

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