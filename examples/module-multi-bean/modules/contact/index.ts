import { IContactRepository } from './repo';

export interface IContact {
    getStorageType(): string;
}

class Contact implements IContact {
    constructor(private repo: IContactRepository) {
    }

    getStorageType(): string {
        console.log('Cloud storage contact service is available.');
        return this.repo.getStorageType();
    }

}

module.exports = Contact;