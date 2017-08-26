import { IDependencyManager, DependencyInjection } from '../';
import { SimpleFilePathMatchLoader } from '../lib/zander/config/config-loader';

import path = require('path');

describe("Simple module load test", () => {

    var depManager: IDependencyManager

    beforeEach((done) => {
        var configLoader = new SimpleFilePathMatchLoader(["examples/simple/modules/module.json"]);
        var modulePath = path.join(__dirname, '..', 'examples', 'simple', 'modules');
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
});