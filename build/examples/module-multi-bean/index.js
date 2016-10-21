"use strict";
var zander = require("../..");
var path = require('path');
var configLoader = new zander.SimpleFilePathMatchLoader(["examples/module-multi-bean/modules/module.json"]);
var depManager = zander.DependencyInjection({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });
depManager.configure().then(function (configured) {
    console.log("All beans are initialized and injected.");
    var customerBean = depManager.getBean("customer");
    customerBean.greet();
});

//# sourceMappingURL=index.js.map
