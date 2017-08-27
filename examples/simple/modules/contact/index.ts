export interface IContact {
    getStorageType(): string;
}

class Contact implements IContact {
    constructor() {
    }

    getStorageType(): string {
        console.log('Cloud storage contact service is available.');
        return "Cloud";
    }

}

module.exports = Contact;