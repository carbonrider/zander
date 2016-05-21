
export interface IContactRepository {

    getStorageType(): string;
}

export class CloudContactRepository implements IContactRepository {
    
    constructor(){
        
    }

    getStorageType(): string {
        return "cloud";
    }
}

module.exports = CloudContactRepository;