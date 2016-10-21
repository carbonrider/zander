"use strict";
var Order = (function () {
    function Order() {
        console.log('Order service has been constructed.');
    }
    Order.prototype.getOrderType = function () {
        return "Fast";
    };
    return Order;
}());
module.exports = Order;

//# sourceMappingURL=index.js.map
