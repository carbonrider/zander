import {IDependencyManager} from '../../';

import path = require('path');

import {ICustomer} from './modules/customer';

import * as zander from "../..";

var configLoader: zander.SimpleFilePathMatchLoader = new zander.SimpleFilePathMatchLoader(["examples/simple/modules/module.json"]);
var depManager: IDependencyManager = zander.DependencyInjection({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });

depManager.configure().then((configured) => {
    console.log("All beans are initialized and injected.");
    
    var customerBean:ICustomer = depManager.getBean("customer");
    customerBean.greet();
});

