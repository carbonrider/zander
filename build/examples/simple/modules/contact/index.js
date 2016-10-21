"use strict";
var Contact = (function () {
    function Contact() {
        console.log('Cloud storage contact service is available.');
    }
    Contact.prototype.getStorageType = function () {
        return "Cloud";
    };
    return Contact;
}());
module.exports = Contact;

//# sourceMappingURL=index.js.map
