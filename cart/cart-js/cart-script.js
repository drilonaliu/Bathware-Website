
for (let index = 1; index < allData.length; index++) {
    let result = localStorage.getItem("productID" + index);
    if (result !== null) {
        displayCartProduct(allData[result - 1]);

    }
}

function getProductByID(id) {
    return allData[parseInt(id) - 1];
}