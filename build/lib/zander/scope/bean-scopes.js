"use strict";
var path = require('path');
var Promise = require('bluebird');
var SingletonScope = (function () {
    function SingletonScope(bean, beanResolver) {
        this.bean = bean;
        this.beanResolver = beanResolver;
        this._isResolved = false;
        this._cb = new Array();
    }
    SingletonScope.prototype.configure = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getConstructorBeans()
                .then(function (constructorRefs) {
                return _this.resolveBean(constructorRefs);
            }).then(function (res) {
                _this.notifyCallbacks();
                resolve(res);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    SingletonScope.prototype.notifyAfterResolve = function (cb) {
        this._cb.push(cb);
    };
    SingletonScope.prototype.notifyCallbacks = function () {
        var _this = this;
        this._cb.forEach(function (cb) {
            cb(_this.getBean());
        });
        this._cb.splice(0, this._cb.length);
    };
    SingletonScope.prototype.getConstructorBeans = function () {
        var _this = this;
        var constructorDepRefs = this.bean.constructorDependencies;
        return new Promise(function (resolve, reject) {
            if (!constructorDepRefs) {
                var refs = [];
                refs.push(null);
                return resolve(refs);
            }
            else {
                var refs = [];
                refs.push(null);
                Promise.each(constructorDepRefs, function (item) {
                    var refPromise = _this.beanResolver.getBean(item.name);
                    refPromise.then(function (ref) {
                        refs.push(ref);
                    });
                    return refPromise;
                }).then(function (refModels) {
                    resolve(refs);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }
        });
    };
    SingletonScope.prototype.resolveBean = function (refs) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var beanPath = _this.bean.path || _this.bean.name;
            var moduleRootPath = _this.beanResolver.getModuleRoot();
            var dynaBean = require(path.join(moduleRootPath, beanPath));
            _this._beanInstance = new (Function.prototype.bind.apply(dynaBean, refs));
            _this._isResolved = true;
            if (_this.bean.initialize) {
                var initMethod = _this._beanInstance[_this.bean.initialize];
                initMethod.call(_this._beanInstance)
                    .then(function (res) {
                    resolve(true);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }
            else {
                resolve(true);
            }
        });
    };
    SingletonScope.prototype.scope = function () {
        return 'singleton';
    };
    SingletonScope.prototype.getBean = function () {
        return this._beanInstance;
    };
    SingletonScope.prototype.isBeanResolved = function () {
        return this._isResolved;
    };
    return SingletonScope;
}());
exports.SingletonScope = SingletonScope;

//# sourceMappingURL=bean-scopes.js.map
