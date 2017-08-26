import {IBeanRepository} from '../beans/bean-store';
import {BeanModel} from '../beans/bean-model';

export interface IBeanParser {
    parseConfig(config: string)
}

export class BeanParser implements IBeanParser {

    constructor(private beanRepository: IBeanRepository) {

    }

    parseConfig(config: string) {
        var jsonConfig: IConfigFile = <IConfigFile>JSON.parse(config);
        Object.keys(jsonConfig).forEach((val: string) => {
            var beanConfig: IBeanConfig = jsonConfig[val];
            this.constructBeanModel(val, beanConfig);
        });
    }

    private constructBeanModel(key: string, config: IBeanConfig): BeanModel {
        var model: BeanModel = new BeanModel(key);
        this.beanRepository.addBean(model);

        config.path && (model.path = config.path);
        
        config.scope && (model.scope = config.scope);

        config.initialize && (model.initialize = config.initialize);
        
        if (config.construct) {
            model.constructorDependencies = this.findBeanReferences(config.construct);
        }

        if (config.props) {
            var props: string[] = Object.keys(config.props);
            props.forEach((propertyName) => {
                var propDependency: string = config.props[propertyName];
                var refModel: BeanModel = this.findBeanReference(propDependency);
                model.addPropertyDependency(propertyName, refModel);
            });
        }
        return model;
    }

    private findBeanReferences(beanNames: string[]): BeanModel[] {
        var beanReferences: BeanModel[] = [];
        beanNames.forEach((val: string) => {
            var ref: BeanModel = this.findBeanReference(val);
            beanReferences.push(ref);
        });
        return beanReferences;
    }

    private findBeanReference(beanName: string): BeanModel {
        var ref: BeanModel = this.beanRepository.getBean(beanName);
        if (!ref) {
            ref = new BeanModel(beanName);
            this.beanRepository.addBean(ref);
        }
        return ref;
    }
}

interface IBeanConfig {
    path: string,
    construct?: string[],
    scope?: string,
    initialize?: string,
    props: { [key: string]: string }
}

interface IConfigFile {
    [key: string]: IBeanConfig
}