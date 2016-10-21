"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var bean_parser_1 = require('./lib/zander/config/bean-parser');
var bean_store_1 = require('./lib/zander/beans/bean-store');
var dependency_resolver_1 = require('./lib/zander/dependency/dependency-resolver');
var Promise = require('bluebird');
__export(require('./lib/zander/config/config-loader'));
var DependencyManager = (function () {
    function DependencyManager(dependencyOptions) {
        this.dependencyOptions = dependencyOptions;
        this.beanRepository = new bean_store_1.BeanRepository();
        this.beanParser = new bean_parser_1.BeanParser(this.beanRepository);
        this.readOptions();
    }
    DependencyManager.prototype.readOptions = function () {
        this.configLoader = this.dependencyOptions.configLoader;
        this.modulePath = this.dependencyOptions.modulePath;
    };
    DependencyManager.prototype.configure = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.configLoader.loadConfig()
                .then(function (configuration) {
                configuration.forEach(function (val) {
                    _this.beanParser.parseConfig(val);
                });
                return Promise.resolve();
            }).then(function () {
                _this.dependencyResolver = new dependency_resolver_1.DependencyResolver(_this.beanRepository, _this.modulePath);
                return _this.dependencyResolver.initializeBeanResolution();
            })
                .then(function () {
                resolve(true);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    DependencyManager.prototype.getBean = function (name) {
        return this.dependencyResolver.getBeanInstance(name);
    };
    return DependencyManager;
}());
exports.DependencyManager = DependencyManager;
function DependencyInjection(options) {
    return new DependencyManager(options);
}
exports.DependencyInjection = DependencyInjection;

//# sourceMappingURL=index.js.map
