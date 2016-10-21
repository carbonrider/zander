"use strict";
var Contact = (function () {
    function Contact(repo) {
        this.repo = repo;
        console.log('Cloud storage contact service is available.');
    }
    Contact.prototype.getStorageType = function () {
        return this.repo.getStorageType();
    };
    return Contact;
}());
module.exports = Contact;

//# sourceMappingURL=index.js.map
