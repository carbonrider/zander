"use strict";
var CloudContactRepository = (function () {
    function CloudContactRepository() {
    }
    CloudContactRepository.prototype.getStorageType = function () {
        return "cloud";
    };
    return CloudContactRepository;
}());
exports.CloudContactRepository = CloudContactRepository;
module.exports = CloudContactRepository;

//# sourceMappingURL=repo.js.map
