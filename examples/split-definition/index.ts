
import * as zander from "../..";

import path = require('path');

import {ICustomer} from './modules/customer/interfaces';

var configLoader: zander.WildcardFilePathConfigLoader = new zander.WildcardFilePathConfigLoader(
    ["examples/simple/modules/*.json"
        , "examples/simple/modules/**/mod.json"]);

var depManager: zander.IDependencyManager = zander.DependencyInjection({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });

depManager.configure().then((configured) => {
    console.log("All beans are initialized from split configuration and injected.");

    var customerBean: ICustomer = depManager.getBean("customer");
    customerBean.greet();
});
