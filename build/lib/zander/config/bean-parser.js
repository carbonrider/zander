"use strict";
var bean_model_1 = require('../beans/bean-model');
var BeanParser = (function () {
    function BeanParser(beanRepository) {
        this.beanRepository = beanRepository;
    }
    BeanParser.prototype.parseConfig = function (config) {
        var _this = this;
        var jsonConfig = JSON.parse(config);
        Object.keys(jsonConfig).forEach(function (val) {
            var beanConfig = jsonConfig[val];
            _this.constructBeanModel(val, beanConfig);
        });
    };
    BeanParser.prototype.constructBeanModel = function (key, config) {
        var _this = this;
        var model = new bean_model_1.BeanModel(key);
        this.beanRepository.addBean(model);
        if (config.path) {
            model.path = config.path;
        }
        if (config.construct) {
            model.constructorDependencies = this.findBeanReferences(config.construct);
        }
        if (config.scope) {
            model.scope = config.scope;
        }
        if (config.initialize) {
            model.initialize = config.initialize;
        }
        if (config.props) {
            var props = Object.keys(config.props);
            props.forEach(function (propertyName) {
                var propDependency = config.props[propertyName];
                var refModel = _this.findBeanReference(propDependency);
                model.addPropertyDependency(propertyName, refModel);
            });
        }
        return model;
    };
    BeanParser.prototype.findBeanReferences = function (beanNames) {
        var _this = this;
        var beanReferences = [];
        beanNames.forEach(function (val) {
            var ref = _this.beanRepository.getBean(val);
            if (!ref) {
                ref = new bean_model_1.BeanModel(val);
                _this.beanRepository.addBean(ref);
            }
            beanReferences.push(ref);
        });
        return beanReferences;
    };
    BeanParser.prototype.findBeanReference = function (beanName) {
        var ref = this.beanRepository.getBean(beanName);
        if (!ref) {
            ref = new bean_model_1.BeanModel(beanName);
            this.beanRepository.addBean(ref);
        }
        return ref;
    };
    return BeanParser;
}());
exports.BeanParser = BeanParser;

//# sourceMappingURL=bean-parser.js.map
