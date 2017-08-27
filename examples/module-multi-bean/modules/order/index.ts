import Promise = require('bluebird');

export interface IOrder {
    getOrderType(): string;
    placeOrder(): boolean;
}

class Order implements IOrder {
    constructor() {
    }

    getOrderType(): string {
        console.log('Order service has been constructed.');
        return "Fast";
    }

    placeOrder(): boolean {
        return true;
    }

}

module.exports = Order;