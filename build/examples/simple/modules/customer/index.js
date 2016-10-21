"use strict";
var Customer = (function () {
    function Customer(contact, order) {
        this.contact = contact;
        this.order = order;
        console.log('My contacts are stored on = ' + contact.getStorageType());
        console.log('My orders delivered = ' + order.getOrderType());
    }
    Customer.prototype.greet = function () {
        console.log("Hi, I would like to place some orders.");
    };
    return Customer;
}());
module.exports = Customer;

//# sourceMappingURL=index.js.map
