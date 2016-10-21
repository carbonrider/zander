"use strict";
var BeanRepository = (function () {
    function BeanRepository() {
        this._beans = {};
    }
    BeanRepository.prototype.addBean = function (bean) {
        this._beans[bean.name] = bean;
    };
    BeanRepository.prototype.getBeans = function () {
        return Object.keys(this._beans);
    };
    BeanRepository.prototype.getBean = function (name) {
        return this._beans[name];
    };
    return BeanRepository;
}());
exports.BeanRepository = BeanRepository;

//# sourceMappingURL=bean-store.js.map
