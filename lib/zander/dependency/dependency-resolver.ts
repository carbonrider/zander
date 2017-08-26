import path = require('path');

import { IBeanRepository } from '../beans/bean-store';
import { BeanModel } from '../beans/bean-model';
import { IDependencyResolver } from '../dependency/dependency-resolver';
import { SingletonScope } from '../scope/bean-scopes';
import { IScope } from '../scope/bean-scopes';

import Promise = require('bluebird');

export interface IDependencyResolver {
    initializeBeanResolution(): Promise<any>;

    getBean(beanName: string): Promise<IScope>;

    getBeanInstance(beanName: string): any;

    loadBean(bean: BeanModel): any;
}


export class DependencyResolver implements IDependencyResolver {

    private _resolvedBeans: { [key: string]: IScope } = {};

    constructor(private beanRepo: IBeanRepository, public moduleRoot: string) {

    }

    public initializeBeanResolution(): Promise<any> {

        var promise: Promise<any>[] = new Array<Promise<any>>();

        var beans: string[] = this.beanRepo.getBeans();
        beans.forEach((val) => {
            promise.push(this.resolveBean(val));
        });

        return Promise.all(promise);
    }

    private resolveBean(name: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            if (this._resolvedBeans[name]) {
                var scopedBean: IScope = this._resolvedBeans[name];
                if (scopedBean.isBeanResolved())
                    return resolve(this._resolvedBeans[name].getBean());
                else {
                    scopedBean.notifyAfterResolve(resolve);
                }
            } else {
                var bean: BeanModel = this.beanRepo.getBean(name);
                if (!bean)
                    throw new Error('Bean[' + name + '] not found.');
                var scope: string = bean.scope || 'singleton';
                if (scope == 'singleton') {
                    var beanScopeRef: IScope = new SingletonScope(bean, this);
                    this._resolvedBeans[name] = beanScopeRef;
                    beanScopeRef.configure()
                        .then((val) => {
                            resolve(beanScopeRef.getBean());
                        }).catch((err) => {
                            reject(err);
                        });
                } else {
                    throw new Error('Bean [' + name + '] cannot be loaded with scope : ' + scope);
                }
            }

        });

    }

    public loadBean(bean: BeanModel): any {
        var beanPath: string = bean.path || bean.name;
        var dynaBean = require(path.join(this.moduleRoot, beanPath));
        return dynaBean;
    }

    public getBean(beanName: string): Promise<any> {
        return this.resolveBean(beanName);
    }

    public getBeanInstance(beanName: string): any {
        if (this._resolvedBeans[beanName]) {
            return this._resolvedBeans[beanName].getBean();
        }
        throw new Error("No bean found with name : " + beanName);
    }
}


