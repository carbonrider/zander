export class BeanModel implements Bean{
    
    referenceResolved: boolean;
    initialize: string;
    scope: string;
    path: string;
    constructorDependencies: BeanModel[];

    constructor(public name) {
    }

    private _propertiesDependency: { [key: string]: BeanModel } = {};

    public addPropertyDependency(prop: string, dependency: BeanModel) {
        this._propertiesDependency[prop] = dependency;
    }

}

interface Bean{
    referenceResolved: boolean,
    initialize: string,
    scope: string,
    path: string   
}