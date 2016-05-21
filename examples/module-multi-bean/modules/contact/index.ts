import {IContactRepository} from './repo';

export interface IContact {
    getStorageType(): string;
}

class Contact implements IContact {
    constructor(private repo: IContactRepository) {
        console.log('Cloud storage contact service is available.');
    }

    getStorageType(): string {
        return this.repo.getStorageType();
    }

}

module.exports = Contact;