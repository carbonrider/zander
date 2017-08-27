import { IDependencyManager, DependencyInjection } from '../';
import { SimpleFilePathMatchLoader } from '../lib/zander/config/config-loader';

import path = require('path');

describe("Simple dependency test", () => {

    var depManager: IDependencyManager

    beforeEach((done) => {
        var configLoader = new SimpleFilePathMatchLoader(["examples/module-multi-bean/modules/module.json"]);
        var modulePath = path.join(__dirname, '..', 'examples', 'module-multi-bean', 'modules');
        depManager = DependencyInjection({ configLoader: configLoader, modulePath: modulePath });
        depManager.configure()
            .then(() => {
                done();
            });
    });

    it("should contain order bean.", () => {
        var orderBean = depManager.getBean("order");
        expect(orderBean).toBeDefined();
    });

    it("should contain contact bean.", () => {
        var contactBean = depManager.getBean("contact");
        expect(contactBean).toBeDefined();
    });

    it("place customer order", () => {
        var customerBean = depManager.getBean("customer");
        expect(customerBean.placeOrder()).toBeTruthy();
    });
});