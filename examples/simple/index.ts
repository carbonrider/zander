import di from '../../';
import {IDependencyManager} from '../../';
import {SimpleFilePathMatchLoader, WildcardFilePathConfigLoader} from '../../lib/zander/config/config-loader';

import path = require('path');

import {ICustomer} from './modules/customer/interfaces';

var configLoader: SimpleFilePathMatchLoader = new SimpleFilePathMatchLoader(["examples/simple/modules/module.json"]);
var depManager: IDependencyManager = di({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });

depManager.configure().then((configured) => {
    console.log("All beans are initialized and injected.");
    
    var customerBean:ICustomer = depManager.getBean("customer");
    customerBean.greet();
});

