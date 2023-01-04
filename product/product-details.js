fetch("../js/products.json")
    .then(response => response.json())
    .then(products => {
        localStorage.setItem("products", JSON.stringify(products));
    });

let productPicture = document.querySelector(".product-picture");
let productDescription = document.querySelector(".product-description");
let cartSection = document.querySelector(".add-to-cart");

// console.log("Window Location:", window.location);
const myKeysValues = window.location.search;
// console.log("Keys & Values:", myKeysValues);

const urlParams = new URLSearchParams(myKeysValues);
const param1 = urlParams.get('id');

// console.log("ID: ",param1);
// document.write('ID:' + param1);

function displayProduct() {
    let products = JSON.parse(localStorage.getItem("products"));
    let counter = 0;
    while (products[counter].id != param1) {
        counter++;
    }
    let pictureOut = `  
                    <figure>
                        <img src="../images/${products[counter].filename}" alt="${products[counter].name} Picture">
                    </figure>`;
    productPicture.innerHTML = pictureOut;
    let descriptionOut = `            <h2>${products[counter].name}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis eligendi eos temporibus
                tempora soluta in. Minus a veritatis tenetur quis sapiente impedit eius, obcaecati iste voluptatum,
                laudantium perspiciatis modi.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis eligendi eos temporibus
                tempora soluta in. Minus a veritatis tenetur quis sapiente impedit eius, obcaecati iste voluptatum,
                laudantium perspiciatis modi.</p>`;
    productDescription.innerHTML = descriptionOut;
    let cartOut = "";
    if (products[counter].discounted) {
        cartOut = `<h3>&dollar;` + calculateDiscount(products[counter]).toFixed(2) + ` <span>&dollar;${products[counter].price}</span></h3>`
    }
    else {
        cartOut = `<h3>&dollar;${products[counter].price}</h3>`
    }
    cartOut += `<button>ADD TO CART</button>`;
    cartSection.innerHTML = cartOut;
}

function calculateDiscount(product) {
    return 0.5 * product.price;
}