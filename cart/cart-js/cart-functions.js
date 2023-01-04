let cartProducts = document.getElementById("cart-products");
let cartProductList = []

function displayCartProduct(cartProduct) {

    cartProductList.push(cartProduct.id);

    console.log(cartProduct.id);
    let div = document.createElement('div');
    div.classList.add('cart-product-row');
    div.setAttribute('id', "cartRowID" + cartProduct.id);
    div.innerHTML = ` <div class="product-cart">
                            <div class="product-image">
                                <img src="../../images/${cartProduct.filename}">
                            </div>
                            <div class="cart-product-name">
                                <p class="product-name"> ${cartProduct.name}</p>
                                <p class="product-company"> ${cartProduct.category} </p>
                            </div>
                          </div>

                        <div class="product-size">
                            <select class="size" name="size">
                                <option> 1 </option>
                                <option> 2 </option>
                                <option> 3 </option>
                            </select>
                        </div>

                        <div class="product-quantity">
                            <form id='myform' method='POST' class='quantity' action='#'>
                                <input name='minus' type='button' value='' class='qtyminus minus' field='quantity' />
                                <label  class = "minus" onclick="decrement(${cartProduct.id})" id="minus" for='minus'>  <img src="../../images/minus.png" width="10px"> </label>
                               
                                <input type='number' name='quantity' value='1' class='qty' />
                                <label class="rez" id="rez${cartProduct.id}" for="quantity"> 1 </label>

                                <input type='button' value='' class='qtyplus plus' field='quantity' />
                                <label class = "plus" onclick="increment(${cartProduct.id})" id="plus" for="plus"> 
                                <img src="../../images/plus.png" width="10px">
                                </label>
                            </form>
                        </div>

                         <p id="price${cartProduct.id}"class="product-price"> ${cartProduct.price} </p>

                        <button class="remove-product" onclick="removeFromCart(${cartProduct.id})">
                            <img src="../../images/close.png" width="15px">
                        </button>
                     `
    cartProducts.appendChild(div);
}

function calculateTotal() {
    let max = 0;
    for (i = 0; i < cartProductList.length; i++){
      max += getRowTotal(cartProductList[i]);
    }

        document.getElementById("total-price").innerHTML = max;
}

function decrement(id) {
    let num = parseInt(document.getElementById("rez" + id.toString()).innerHTML);
    num -= 1;
    if (num < 1) {
        num = 1;
    }
    document.getElementById("rez" + id.toString()).innerHTML = num;
    updateRowTotal(id, num);
    calculateTotal()
}


function increment(id) {
    let num = parseInt(document.getElementById("rez" + id.toString()).innerHTML);
    num += 1;
    document.getElementById("rez" + id.toString()).innerHTML = num;
    updateRowTotal(id, num);
    calculateTotal()
}

function updateRowTotal(id, num) {
    var productPrice = parseFloat(getProductByID(id).price);
    // console.log(document.getElementById("price" + id.toString()))
    document.getElementById("price" + id.toString()).innerHTML = num * productPrice
}

function removeFromCart(id) {
    localStorage.removeItem("productID" + id);
    let cartProduct = document.getElementById("cartRowID" + id);
    cartProduct.style.display = 'none';
}

function getRowTotal(id) {
  return parseFloat(document.getElementById("price" + id.toString()).innerHTML)
}