import * as zander from "../..";

import path = require('path');

import {ICustomer} from './modules/customer/interfaces';

var configLoader: zander.SimpleFilePathMatchLoader = new zander.SimpleFilePathMatchLoader(["examples/module-multi-bean/modules/module.json"]);
var depManager: zander.IDependencyManager = zander.DependencyInjection({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });

depManager.configure().then((configured) => {
    console.log("All beans are initialized and injected.");

    var customerBean: ICustomer = depManager.getBean("customer");
    customerBean.greet();
});

