export interface IContact {
    getStorageType(): string;
}

class Contact implements IContact {
    constructor() {
        console.log('Cloud storage contact service is available.');
    }

    getStorageType(): string {
        return "Cloud";
    }

}

module.exports = Contact;