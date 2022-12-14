function outputItem(product) {
    document.write('<div class="product">');
    document.write('<div class="image-wrapper">');
    document.write('<img class="product-image" src="images/' + product.product.filename + '" alt="' + product.product.name + '">');
    document.write('<div class="image-overlay">');
    document.write('<button><a href="#">ADD TO CART <img src="images/cart-icon.png" alt="cart-icon"></a></button>');
    document.write('<nav>');
    document.write('<ul class="product-navbar">');
    document.write('<li><a href="#"><img src="images/heart-icon.png" alt="heart"></a></li>');
    document.write('<li><a href="#"><img src="images/eye-icon.png" alt="eye"></a></li>');
    document.write('<li><a href="#"><img src="images/arrow-icon.png" alt="arrow"></a></li>');
    document.write('</ul>');
    document.write('</nav>');
    document.write('</div>');
    document.write('</div>');
    document.write('<p class="product-description"><a href="#">' + product.product.name + '</a></p>');
    document.write('<p class="price">&dollar;' + product.product.price + '</p>');
    document.write('</div>');
}