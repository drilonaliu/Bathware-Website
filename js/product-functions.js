fetch("../../js/products.json")
    .then(response => response.json())
    .then(products => {
        localStorage.setItem("products", JSON.stringify(products));
    });

let container = document.querySelector(".product-cards");
const initialItems = Math.floor(container.offsetWidth / 253);
let numOfItems = initialItems;
let pageNumber = 0;

let totalProducts = 0;
let category;

const rangeInput = document.querySelectorAll(".range-input input");
priceInput = document.querySelectorAll(".price-input input");
progress = document.querySelector(".slider .progress");

let displayOptions = document.querySelectorAll(".option div");

let info = document.createElement("p");

let priceGap = 100;

let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
    dropdown.classList.toggle("active");
}

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
            priceCategory(minVal, maxVal);
        }

    });
});

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if ((maxVal - minVal >= priceGap) && maxVal <= 1000 && minVal >= 0) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }
            else {
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
            priceCategory(minVal, maxVal);
        }
    });
});


function displaySizes() {
    displayOptions[0].innerHTML = numOfItems;
    displayOptions[1].innerHTML = numOfItems * 2;
}

function logClick(n) {
    if (n == 1) {
        document.querySelector(".textBox").value = initialItems;
        numOfItems = initialItems;
        pageNumber = 0;
        loadFromCategory(this.category);
    }
    if (n == 2) {
        document.querySelector(".textBox").value = initialItems * 2;
        numOfItems = initialItems * 2;
        pageNumber = 0;
        loadFromCategory(this.category);
    }
}

function addInfoText() {
    info.className = 'info';
    info.innerHTML = 'No products match that price range!';
    container.append(info);
}

function priceCategory(minVal, maxVal) {
    let products = document.querySelectorAll(".product-cards .product");
    info.style.display = "none";
    container.style.justifyContent = "left";
    let counter = 0;
    products.forEach(function (product) {
        price = parseInt(product.getElementsByClassName("price")[0].firstChild.data.substring(1));
        console.log(price);
        if (price < minVal || price > maxVal) {
            product.style.display = "none";
        }
        else {
            product.style.display = "block";
        }
        if (product.style.display === "none")
            counter++;
    });
    if (counter == products.length) {
        info.style.display = "flex";
        container.style.justifyContent = "center";
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function numOfProducts(category) {
    let products = JSON.parse(localStorage.getItem("products"));
    for (let product of products) {
        if (product.category === category) {
            totalProducts++;
        }
    }
    document.getElementsByName("Dropdown")[0].placeholder = numOfItems;
}

function loadFromCategory(category) {
    this.category = category;
    removeAllChildNodes(container);
    addInfoText();
    let products = JSON.parse(localStorage.getItem("products"));
    let out = "";
    let counter = 0;
    for (let product of products) {
        if (counter < numOfItems * (pageNumber + 1) && product.category === category) {
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
            <p class="product-description"><a href="../../product/?id=${product.id}">${product.name}</a></p>
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
            if (counter >= numOfItems * pageNumber) {
                let div = document.createElement("div");
                div.className = 'product';
                container.append(div);
                div.innerHTML = out;
                div.style.opacity = 0;
                fadeIn(div);
            }
            counter++;
        }

    }
}

function loadMore(bool) {
    if (bool) {
        if (pageNumber + 1 < Math.ceil(totalProducts / numOfItems)) {
            pageNumber += 1;
            fadeOutProductCards();
            loadFromCategory(this.category);
        }
        if(pageNumber +1 >= Math.ceil(totalProducts / numOfItems)) {
            document.querySelectorAll(".previous-next li")[1].style.color = "gray";
        }
        else{
            document.querySelectorAll(".previous-next li")[0].style.color = "black";
            document.querySelectorAll(".previous-next li")[1].style.color = "black";
        }
    }
    else {
        if (pageNumber - 1 >= 0) {
            pageNumber -= 1;
            fadeOutProductCards();
            loadFromCategory(this.category);
        }
        if(pageNumber - 1 < 0) {
            document.querySelectorAll(".previous-next li")[0].style.color = "gray";
        }
        else{
            document.querySelectorAll(".previous-next li")[1].style.color = "black";
            document.querySelectorAll(".previous-next li")[0].style.color = "black";
        }
    }

}

function fadeOutProductCards() {
    let products = document.querySelectorAll(".product-cards .product");
    for (let product of products) {
        fadeOut(product);
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

function fadeOut(div) {
    let opacity = 1;
    let interval = setInterval(function () {
        if (opacity > 0) {
            opacity = opacity - 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

function calculateDiscount(product) {
    return 0.5 * product.price;
}