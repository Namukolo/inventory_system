"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
//DOM  ELEMENTS
var product1Stock = document.querySelector("#product1_stock");
var product1Price = document.querySelector("#product1_price");
var product2Stock = document.querySelector("#product2_stock");
var product2Price = document.querySelector("#product2_price");
var product3Stock = document.querySelector("#product3_stock");
var product3Price = document.querySelector("#product3_price");
var btn_addStock = document.querySelector("#add-stock");
var form_addStock = document.querySelector("#form_addStock");
var btn_removeStock = document.querySelector("#remove-stock");
var form_removeStock = document.querySelector("#form_removeStock");
//PRODUCT CLASS
var Product = /** @class */ (function () {
    function Product(code, stock, pricelist) {
        this.code = code;
        this.stock = stock;
        this.pricelist = pricelist;
    }
    Product.prototype.getPrice = function () {
        return ("" +
            (this.pricelist.reduce(function (acc, currPrice) { return acc + currPrice; }) /
                this.pricelist.length).toFixed(2));
    };
    Product.prototype.addStock = function (numOfItems, price) {
        this.stock += numOfItems;
        this.pricelist.push(price);
        displayLevels();
    };
    Product.prototype.removeStock = function (numOfItems, buyerEmail) {
        //TODO:: CHECK TO MAKE SURE CHANGE FROM INCLUDES TO INDEX OF WORKS CORRECTLY
        if (buyersRecords.indexOf(buyerEmail) == -1) {
            return "Purchase unSuccessful";
        }
        if (this.stock - numOfItems < 0) {
            return "Not enough stock";
        }
        this.stock -= numOfItems;
        buyersRecords.push(buyerEmail);
        displayLevels();
        return "Purchase Successful";
    };
    return Product;
}());
//HELPER FUNCTIONS
function displayLevels() {
    product1Price.textContent = "R" + product1.getPrice();
    product1Stock.textContent = product1.stock;
    product2Price.textContent = "R" + product2.getPrice();
    product2Stock.textContent = product2.stock;
    product3Price.textContent = "R" + product3.getPrice();
    product3Stock.textContent = product3.stock;
}
function processResult(result, message, btn_removeStock) {
    if (result === "Purchase unSuccessful") {
        message.style.visibility = "visible";
        message.textContent = "You have already purchased using this email";
    }
    else if (result === "Not enough stock") {
        message.style.visibility = "visible";
        message.textContent = "Not enough Stock for this purchase";
    }
    btn_removeStock.textContent = result;
    setTimeout(function () {
        message.textContent = "ll";
        message.style.visibility = "hidden";
        btn_removeStock.textContent = "Remove Stock";
    }, 2000);
}
// EVENT LISTENERS
btn_addStock.addEventListener("click", function (e) {
    e.preventDefault();
    var numOfItems = +document.querySelector("#items-received").value;
    var price = +document.querySelector("#item-price").value;
    var productCode_add = document.querySelector("#product-code-add").value;
    var message = document.querySelector(".output-message-add");
    if (productCode_add == "product1") {
        product1.addStock(numOfItems, price);
    }
    else if (productCode_add == "product2") {
        product2.addStock(numOfItems, price);
    }
    else if (productCode_add == "product3") {
        product3.addStock(numOfItems, price);
    }
    message.textContent = "Stock Added";
    message.style.visibility = "visible";
    setTimeout(function () {
        message.style.visibility = "hidden";
        form_addStock.reset();
    }, 2000);
});
btn_removeStock.addEventListener("click", function (e) {
    e.preventDefault();
    var numOfItems = +document.querySelector("#items-purchased").value;
    var buyerEmail = document.querySelector("#buyer-email").value;
    var productCode_remove = document.querySelector("#product-code-remove").value;
    var message = document.querySelector(".output-message-remove");
    //PRODUCT ONE
    if (productCode_remove == "product1") {
        var result = product1.removeStock(numOfItems, buyerEmail);
        processResult(result, message, btn_removeStock);
        //PRODUCT TWO
    }
    else if (productCode_remove == "product2") {
        var result = product2.removeStock(numOfItems, buyerEmail);
        processResult(result, message, btn_removeStock);
        //PRODUCT THREE
    }
    else if (productCode_remove == "product3") {
        var result = product3.removeStock(numOfItems, buyerEmail);
        processResult(result, message, btn_removeStock);
    }
    form_removeStock.reset();
});
//TEST DATA(TO INITIALIZE PROGRAM)
var product1 = new Product(1, 12, [23, 56]);
var product2 = new Product(2, 32, [200, 156, 250, 180]);
var product3 = new Product(3, 90, [3, 8, 10, 7]);
var buyersRecords = ["test@test.com", "test2@test.com", "test3@test.com"];
var store = [product1, product2, product3, __spreadArray([], buyersRecords)];
displayLevels();
