"use strict";
//DOM  ELEMENTS
const product1Stock = document.querySelector("#product1_stock");
const product1Price = document.querySelector("#product1_price");
const product2Stock = document.querySelector("#product2_stock");
const product2Price = document.querySelector("#product2_price");
const product3Stock = document.querySelector("#product3_stock");
const product3Price = document.querySelector("#product3_price");
const btn_addStock = document.querySelector("#add-stock");
const form_addStock = document.querySelector("#form_addStock");
const btn_removeStock = document.querySelector("#remove-stock");
const form_removeStock = document.querySelector("#form_removeStock");
//ADDITIONAL ELEMENTS
const itemsReceived = document.querySelector("#items-received");
const itemPrice = document.querySelector("#item-price");
const productCode_add = document.querySelector("#product-code-add");
const itemsPurchased = document.querySelector("#items-purchased");
const buyerEmail = document.querySelector("#buyer-email");
const productCode_remove = document.querySelector("#product-code-remove");
//PRODUCT CLASS
class Product {
    constructor(code, stock, pricelist) {
        this.code = code;
        this.stock = stock;
        this.pricelist = pricelist;
    }
    getPrice() {
        return ("" +
            (this.pricelist.reduce((acc, currPrice) => acc + currPrice) /
                this.pricelist.length).toFixed(2));
    }
    addStock(numOfItems, price) {
        this.stock += numOfItems;
        this.pricelist.push(price);
        displayLevels();
    }
    removeStock(numOfItems, buyerEmail) {
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
    }
}
//HELPER FUNCTIONS
function displayLevels() {
    product1Price.textContent = `R${product1.getPrice()}`;
    product1Stock.textContent = "" + product1.stock;
    product2Price.textContent = `R${product2.getPrice()}`;
    product2Stock.textContent = "" + product2.stock;
    product3Price.textContent = `R${product3.getPrice()}`;
    product3Stock.textContent = "" + product3.stock;
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
form_addStock.addEventListener("submit", (e) => {
    e.preventDefault();
    const numOfItems = +itemsReceived.value;
    const price = +itemPrice.value;
    const productCode = productCode_add.value;
    const message = document.querySelector(".output-message-add");
    console.log(numOfItems, price, productCode);
    if (productCode == "product1") {
        product1.addStock(numOfItems, price);
    }
    else if (productCode == "product2") {
        product2.addStock(numOfItems, price);
    }
    else if (productCode == "product3") {
        product3.addStock(numOfItems, price);
    }
    message.textContent = "Stock Added";
    message.style.visibility = "visible";
    setTimeout(() => {
        message.style.visibility = "hidden";
        form_addStock.reset();
    }, 2000);
});
form_removeStock.addEventListener("submit", (e) => {
    e.preventDefault();
    const numOfItems = itemsPurchased.valueAsNumber;
    const email = buyerEmail.value;
    const productCode = productCode_remove.value;
    const message = document.querySelector(".output-message-remove");
    //PRODUCT ONE
    if (productCode == "product1") {
        const result = product1.removeStock(numOfItems, email);
        processResult(result, message, btn_removeStock);
        //PRODUCT TWO
    }
    else if (productCode == "product2") {
        const result = product2.removeStock(numOfItems, email);
        processResult(result, message, btn_removeStock);
        //PRODUCT THREE
    }
    else if (productCode == "product3") {
        const result = product3.removeStock(numOfItems, email);
        processResult(result, message, btn_removeStock);
    }
    form_removeStock.reset();
});
//TEST DATA(TO INITIALIZE PROGRAM)
const product1 = new Product(1, 12, [23, 56]);
const product2 = new Product(2, 32, [200, 156, 250, 180]);
const product3 = new Product(3, 90, [3, 8, 10, 7]);
const buyersRecords = ["test@test.com", "test2@test.com", "test3@test.com"];
const store = [product1, product2, product3, [...buyersRecords]];
displayLevels();
