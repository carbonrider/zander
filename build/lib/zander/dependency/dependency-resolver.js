"use strict";
var bean_scopes_1 = require('../scope/bean-scopes');
var Promise = require('bluebird');
var DependencyResolver = (function () {
    function DependencyResolver(beanRepo, moduleRoot) {
        this.beanRepo = beanRepo;
        this.moduleRoot = moduleRoot;
        this._resolvedBeans = {};
    }
    DependencyResolver.prototype.initializeBeanResolution = function () {
        var _this = this;
        var promise = new Array();
        var beans = this.beanRepo.getBeans();
        beans.forEach(function (val) {
            promise.push(_this.resolveBean(val));
        });
        return Promise.all(promise);
    };
    DependencyResolver.prototype.resolveBean = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._resolvedBeans[name]) {
                var scopedBean = _this._resolvedBeans[name];
                if (scopedBean.isBeanResolved())
                    return resolve(_this._resolvedBeans[name].getBean());
                else {
                    scopedBean.notifyAfterResolve(resolve);
                }
            }
            else {
                var bean = _this.beanRepo.getBean(name);
                if (!bean)
                    throw new Error('Bean[' + name + '] not found.');
                var scope = bean.scope || 'singleton';
                if (scope == 'singleton') {
                    var beanScopeRef = new bean_scopes_1.SingletonScope(bean, _this);
                    _this._resolvedBeans[name] = beanScopeRef;
                    beanScopeRef.configure()
                        .then(function (val) {
                        resolve(beanScopeRef.getBean());
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            }
        });
    };
    DependencyResolver.prototype.getBean = function (beanName) {
        return this.resolveBean(beanName);
    };
    DependencyResolver.prototype.getModuleRoot = function () {
        return this.moduleRoot;
    };
    DependencyResolver.prototype.getBeanInstance = function (beanName) {
        if (this._resolvedBeans[beanName]) {
            return this._resolvedBeans[beanName].getBean();
        }
        throw new Error("No bean found with name : " + beanName);
    };
    return DependencyResolver;
}());
exports.DependencyResolver = DependencyResolver;

//# sourceMappingURL=dependency-resolver.js.map
