import {IContact} from '../contact';
import {IOrder} from '../order';

export interface ICustomer {
    greet(): void;
    placeOrder(): boolean;
}

class Customer implements ICustomer {
    constructor(private contact: IContact, private order: IOrder) {
    }

    greet(): void {
        console.log('My contacts are stored on = ' + this.contact.getStorageType());
    }

    placeOrder(): boolean {
        console.log('My orders delivered = ' + this.order.getOrderType());
        return this.order.placeOrder();
    }
}

module.exports = Customer;