"use strict";
var BeanModel = (function () {
    function BeanModel(beanName) {
        this.beanName = beanName;
        this._propertiesDependency = {};
    }
    Object.defineProperty(BeanModel.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (val) {
            this._path = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeanModel.prototype, "name", {
        get: function () {
            return this.beanName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeanModel.prototype, "constructorDependencies", {
        get: function () {
            return this._constructorDependency;
        },
        set: function (val) {
            this._constructorDependency = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeanModel.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        set: function (val) {
            this._scope = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeanModel.prototype, "initialize", {
        get: function () {
            return this._initialize;
        },
        set: function (val) {
            this._initialize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeanModel.prototype, "referenceResolved", {
        get: function () {
            return this._refResolved;
        },
        set: function (val) {
            this._refResolved = true;
        },
        enumerable: true,
        configurable: true
    });
    BeanModel.prototype.addPropertyDependency = function (prop, dependency) {
        this._propertiesDependency[prop] = dependency;
    };
    return BeanModel;
}());
exports.BeanModel = BeanModel;

//# sourceMappingURL=bean-model.js.map
