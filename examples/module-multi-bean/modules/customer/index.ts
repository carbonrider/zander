import {IContact} from '../contact';
import {IOrder} from '../order';

import {ICustomer} from './interfaces';

class Customer implements ICustomer {
    constructor(private contact: IContact, private order: IOrder) {
        console.log('My contacts are stored on = ' + contact.getStorageType() );
        console.log('My orders delivered = ' +  order.getOrderType());
    }
    
    greet():void{
        console.log("Hi, I would like to place some orders.");
    }
}

module.exports = Customer;