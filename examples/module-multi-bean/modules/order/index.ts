import Promise = require('bluebird');

export interface IOrder {
    getOrderType(): string;
}

class Order implements IOrder {
    constructor() {
        console.log('Order service has been constructed.');
    }

    getOrderType(): string {
        return "Fast";
    }

}

module.exports = Order;